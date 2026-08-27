// Mock service layer. Every function here returns a Promise, mirroring the
// shape a real fetch() call to the Express + MongoDB backend will have.
// Swap the body of these functions for real `fetch(`/api/...`)` calls later —
// nothing above this layer (pages, components) should need to change.

import * as mock from '../data/mockData';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(email, password) {
    await delay(900);
    if (!email || !password) throw new Error('Email and password are required.');
    if (password.length < 6) throw new Error('Invalid email or password.');
    return { user: mock.currentUser, token: 'mock-jwt-token' };
  },
  async register(payload) {
    await delay(1000);
    if (payload.password !== payload.confirmPassword) {
      throw new Error('Passwords do not match.');
    }
    return { user: { ...mock.currentUser, name: payload.fullName, email: payload.email }, token: 'mock-jwt-token' };
  },
  async requestPasswordReset(email) {
    await delay(800);
    if (!email) throw new Error('Enter your email address.');
    return { success: true };
  },
};

export const userService = {
  async getCurrentUser() {
    await delay(300);
    return mock.currentUser;
  },
};

export const subjectService = {
  async listSubjects() {
    await delay(500);
    return mock.subjects;
  },
  async getSubject(id) {
    await delay(400);
    const subject = mock.subjects.find((s) => s.id === id);
    if (!subject) throw new Error('Subject not found.');
    return subject;
  },
};

export const documentService = {
  async listDocuments(subjectId) {
    await delay(450);
    return subjectId ? mock.documents.filter((d) => d.subjectId === subjectId) : mock.documents;
  },
  async getDocument(id) {
    await delay(400);
    const document = mock.documents.find((d) => d.id === id);
    if (!document) throw new Error('Document not found.');
    return { ...document, ...(mock.documentDetail[id] || {}) };
  },
};

export const flashcardService = {
  async listDecks(subjectId) {
    await delay(400);
    return subjectId ? mock.flashcardDecks.filter((d) => d.subjectId === subjectId) : mock.flashcardDecks;
  },
  async listCards(deckId) {
    await delay(400);
    return deckId ? mock.flashcards.filter((c) => c.deckId === deckId) : mock.flashcards;
  },
};

export const quizService = {
  async listQuizzes(subjectId) {
    await delay(450);
    return subjectId ? mock.quizzes.filter((q) => q.subjectId === subjectId) : mock.quizzes;
  },
  async getQuiz(id) {
    await delay(400);
    const quiz = mock.quizzes.find((q) => q.id === id);
    if (!quiz) throw new Error('Quiz not found.');
    return { ...quiz, questions: mock.quizQuestions };
  },
  async getResult(id) {
    await delay(400);
    return mock.quizResults[id] || mock.quizResults['quiz-attempt-1'];
  },
};

export const aiTutorService = {
  async listConversations() {
    await delay(350);
    return mock.aiConversations;
  },
  async getMessages() {
    await delay(400);
    return mock.aiMessages;
  },
  async sendMessage(text) {
    await delay(1400);
    return {
      id: `m-${Date.now()}`,
      role: 'ai',
      time: new Date().toISOString(),
      content: `That's a great question about "${text}". Based on your current materials, here's a focused explanation tailored to where you're studying right now — try connecting it back to the worked examples in your last document for it to stick.`,
    };
  },
};

export const studyPlanService = {
  async getTodayPlan() {
    await delay(400);
    return mock.todayPlan;
  },
  async getWeeklyPlan() {
    await delay(450);
    return mock.weeklyPlan;
  },
};

export const analyticsService = {
  async getStats() {
    await delay(400);
    return mock.analyticsStats;
  },
  async getCharts() {
    await delay(500);
    return {
      studyTimeWeekly: mock.analyticsStudyTimeWeekly,
      quizPerformance: mock.analyticsQuizPerformance,
      topicMastery: mock.analyticsTopicMastery,
      consistency: mock.analyticsConsistency,
    };
  },
};

export const dashboardService = {
  async getOverview() {
    await delay(600);
    return {
      stats: mock.dashboardStats,
      subjects: mock.subjects,
      todayPlan: mock.todayPlan,
      weakTopics: mock.weakTopics,
      recentActivity: mock.recentActivity,
    };
  },
};
