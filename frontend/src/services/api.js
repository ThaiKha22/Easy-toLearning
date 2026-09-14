import axios from "axios";

const ACCESS_TOKEN_KEY = "studyhub_access_token";
const USER_KEY = "studyhub_user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    const message = error.response?.data?.message || error.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

const data = (response) => response.data.data;

const normalizeSubject = (subject) => ({
  ...subject,
  id: subject.id || subject._id,
  progress: subject.progress ?? 0,
  lastStudied: subject.lastStudied || subject.updatedAt || subject.createdAt || new Date().toISOString(),
  documents: subject.documents ?? 0,
  flashcards: subject.flashcards ?? 0,
  quizzes: subject.quizzes ?? 0,
});

const normalizeDocument = (document) => ({
  ...document,
  id: document.id || document._id,
  status: {
    uploaded: 'uploaded',
    processing: 'processing',
    completed: 'ready',
    failed: 'error',
  }[document.status || document.processingStatus] || 'uploaded',
  type: (document.type || document.extension || document.mimeType || 'file').replace('.', ''),
  sizeKb: document.sizeKb ?? Math.ceil((document.fileSize || 0) / 1024),
  uploadedAt: document.uploadedAt || document.createdAt,
});

export const authService = {
  async login(email, password) {
    const result = data(await api.post("/auth/login", { email, password }));
    localStorage.setItem(ACCESS_TOKEN_KEY, result.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    return result;
  },
  async register(payload) {
    const result = data(await api.post("/auth/register", payload));
    localStorage.setItem(ACCESS_TOKEN_KEY, result.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    return result;
  },
  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  async requestPasswordReset() {
    throw new Error("Password reset is not available yet.");
  },
};

export const userService = {
  async getCurrentUser() {
    const result = data(await api.get("/users/me"));
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    return result.user;
  },
  async updateProfile(payload) {
    const result = data(await api.patch("/users/me", payload));
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    return result.user;
  },
  async updatePreferences(payload) {
    const result = data(await api.patch("/users/me/preferences", payload));
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    return result.user;
  },
  async updateNotifications(payload) {
    const result = data(await api.patch("/users/me/notifications", payload));
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    return result.user;
  },
  async updateAppearance(payload) {
    const result = data(await api.patch("/users/me/appearance", payload));
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    return result.user;
  },
  async changePassword(payload) {
    return data(await api.patch("/users/me/password", payload));
  },
};

export const subjectService = {
  async listSubjects() {
    return data(await api.get("/subjects")).subjects.map(normalizeSubject);
  },
  async getSubject(id) {
    return normalizeSubject(data(await api.get(`/subjects/${id}`)).subject);
  },
  async createSubject(payload) {
    return normalizeSubject(data(await api.post("/subjects", payload)).subject);
  },
  async updateSubject(id, payload) {
    return normalizeSubject(data(await api.patch(`/subjects/${id}`, payload)).subject);
  },
  async deleteSubject(id) {
    return api.delete(`/subjects/${id}`);
  },
};

export const documentService = {
  async listDocuments(subjectId) {
    const endpoint = subjectId ? `/documents/subject/${subjectId}` : "/documents";
    return data(await api.get(endpoint)).documents.map(normalizeDocument);
  },
  async getDocument(id) {
    return normalizeDocument(data(await api.get(`/documents/${id}`)).document);
  },
  async upload(file, subjectId, title = file.name) {
    const formData = new FormData();
    formData.append("file", file);
    if (subjectId) formData.append("subjectId", subjectId);
    formData.append("title", title);
    const response = await api.post("/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return normalizeDocument(data(response).document);
  },
  async deleteDocument(id) {
    const response = await api.delete(`/documents/${id}`);
    return response.data?.data ?? response.data;
  },
};

export const flashcardService = {
  async listCards(filter) {
    const params = typeof filter === "string" ? { subjectId: filter } : filter;
    return data(await api.get("/flashcards", { params })).flashcards || [];
  },
  async listDecks(subjectId) {
    const cards = await this.listCards(subjectId ? { subjectId } : undefined);
    const decks = new Map();

    cards.forEach((card) => {
      const document = card.documentId;
      const documentId = document?._id || document || 'all';
      const deck = decks.get(documentId) || {
        id: documentId,
        documentId,
        name: document?.title || 'Tất cả thẻ ghi nhớ',
        cardCount: 0,
        mastered: 0,
      };

      deck.cardCount += 1;
      if (card.status === 'known') deck.mastered += 1;
      decks.set(documentId, deck);
    });

    return Array.from(decks.values());
  },
  async updateCard(id, payload) {
    return data(await api.patch(`/flashcards/${id}`, payload));
  },
};

export const quizService = {
  async listQuizzes(subjectId) {
    const params = subjectId ? { subjectId } : undefined;
    const quizzes = data(await api.get("/quizzes", { params })).quizzes;
    return quizzes.map((quiz) => ({
      ...quiz,
      id: quiz._id,
      questionCount: quiz.totalQuestions,
      estimatedMinutes: Math.max(1, Math.ceil(quiz.totalQuestions * 1.5)),
      attempts: 0,
      difficulty: quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1),
    }));
  },
  async getQuiz(id) {
    const result = data(await api.get(`/quizzes/${id}`));
    return {
      ...result.quiz,
      id: result.quiz._id,
      questions: result.questions.map((question) => ({
        ...question,
        id: question._id,
        prompt: question.question,
        options: question.options.map((option, index) => ({
          id: index,
          label: option,
        })),
      })),
    };
  },
  async submitAttempt(quizId, answers) {
    return data(await api.post(`/quizzes/${quizId}/attempts`, { answers })).attempt;
  },
  async getResult(attemptId) {
    const result = data(await api.get(`/quizzes/attempts/${attemptId}`));
    const quiz = result.attempt.quizId;
    return {
      quizId: quiz?._id || quiz,
      subjectId: quiz?.subjectId?._id || quiz?.subjectId,
      quizTitle: quiz?.title || 'Quiz result',
      score: result.attempt.percentage,
      correct: result.attempt.correctAnswers,
      incorrect: result.attempt.wrongAnswers,
      timeTakenMinutes: 0,
      strongTopics: [],
      weakTopics: [],
      aiAnalysis: 'Review the questions you missed and try the quiz again to reinforce your understanding.',
      results: result.results,
    };
  },
};

export const analyticsService = {
  async getStats() {
    const overview = data(await api.get("/analytics/overview")).analytics;
    return {
      totalStudyMinutes: overview.study?.totalMinutes ?? 0,
      currentStreak: overview.study?.currentStreak ?? 0,
      averageQuizScore: overview.quiz?.averagePercentage ?? 0,
      topicsMastered: overview.subjects?.total
        ? Math.round((overview.tasks?.completionPercentage ?? 0) * overview.subjects.total / 100)
        : 0,
    };
  },
  async getCharts() {
    const [studyTime, quizPerformance, subjects] = await Promise.all([
      api.get("/analytics/study-time"),
      api.get("/analytics/quiz-performance"),
      api.get("/analytics/subjects"),
    ]);
    const studyRows = data(studyTime).analytics || [];
    const quizRows = data(quizPerformance).analytics || [];
    const subjectRows = data(subjects).analytics || [];
    return {
      studyTimeWeekly: studyRows.map((item) => ({
        week: item.date,
        minutes: item.totalMinutes ?? 0,
      })),
      quizPerformance: quizRows.map((item) => ({
        date: item.completedAt?.slice?.(0, 10) || "",
        score: item.percentage ?? 0,
      })),
      topicMastery: subjectRows.map((item) => ({
        topic: item.subjectName,
        mastery: item.progress ?? 0,
      })),
      consistency: studyRows.map((item) => ({
        day: item.date,
        minutes: item.totalMinutes ?? 0,
      })),
    };
  },
};

export const studySessionService = {
  async list(params) {
    return data(await api.get("/study-sessions", { params })).sessions || [];
  },
  async create(payload) {
    return data(await api.post("/study-sessions", payload)).session;
  },
  async getSummary(subjectId) {
    const params = subjectId ? { subjectId } : undefined;
    return (data(await api.get("/study-sessions/summary", { params }))).summary;
  },
};

export const progressService = {
  async getOverview() {
    return data(await api.get("/progress")).subjects || [];
  },
  async getSubject(subjectId) {
    return (data(await api.get(`/progress/subjects/${subjectId}`))).progress;
  },
};

export const studyPlanService = {
  async listPlans() {
    return data(await api.get("/study-plans")).studyPlans || [];
  },
  async getWeeklyPlan() {
    const plans = await this.listPlans();
    const days = new Map();
    plans.forEach((plan) => {
      (plan.tasks || []).forEach((task) => {
        const date = new Date(task.date);
        const key = date.toISOString().slice(0, 10);
        if (!days.has(key)) {
          days.set(key, {
            day: date.toLocaleDateString(undefined, { weekday: "short" }),
            date: key,
            planId: plan._id,
            tasks: [],
          });
        }
        days.get(key).tasks.push({
          id: task._id,
          topic: task.title,
          duration: task.duration ?? 30,
          difficulty: task.type === "quiz" ? "Medium" : "Easy",
          done: task.completed ?? false,
        });
      });
    });
    return [...days.values()].sort((first, second) => first.date.localeCompare(second.date));
  },
  async getTodayPlan() {
    const plans = await this.listPlans();
    return plans[0] || null;
  },
  async updateTask(planId, taskId, completed) {
    return data(await api.patch(`/study-plans/${planId}/tasks/${taskId}`, { completed })).studyPlan;
  },
};

export const aiDocumentService = {
  async summarizeDocument(documentId) {
    return data(await api.post(`/ai/documents/${documentId}/summary`));
  },
  async generateFlashcards(documentId, payload) {
    return data(await api.post(`/ai/documents/${documentId}/flashcards`, payload));
  },
  async generateQuiz(documentId, payload) {
    return data(await api.post(`/ai/documents/${documentId}/quiz`, payload));
  },
};

export const dashboardService = {
  async getOverview() {
    const [subjects, stats, plans, progress] = await Promise.all([
      subjectService.listSubjects(),
      analyticsService.getStats(),
      studyPlanService.listPlans(),
      progressService.getOverview(),
    ]);
    const progressBySubject = new Map(progress.map((item) => [String(item.subjectId), item]));
    const subjectsWithProgress = subjects.map((subject) => {
      const item = progressBySubject.get(String(subject.id));
      return item ? { ...subject, progress: item.progress } : subject;
    });
    const overview = stats || {};
    const activePlan = plans.find((plan) => plan.status === "active") || plans[0];
    const today = new Date().toDateString();
    const todayPlan = (activePlan?.tasks || [])
      .filter((task) => new Date(task.date).toDateString() === today)
      .map((task) => ({
        id: task._id || task.id,
        topic: task.title,
        duration: task.duration,
        difficulty: task.type === "quiz" ? "Medium" : "Easy",
        done: task.completed,
      }));
    const dashboardStats = {
      overallProgress: overview.tasks?.completionPercentage ?? 0,
      studyStreak: overview.study?.currentStreak ?? 0,
      studyTimeMinutes: overview.study?.totalMinutes ?? 0,
      quizAverage: overview.quiz?.averagePercentage ?? 0,
    };
    const weakTopics = subjectsWithProgress
      .filter((subject) => subject.progress < 70)
      .map((subject) => ({
        id: subject.id,
        name: subject.name,
        mastery: subject.progress,
      }));
    return {
      stats: dashboardStats,
      subjects: subjectsWithProgress || [],
      todayPlan,
      weakTopics,
      recentActivity: [],
    };
  },
};

export default api;
