import Quiz from "../models/Quiz.js";
import QuizQuestion from "../models/Quiz-question.js";
import QuizAttempt from "../models/Quiz-attempt.js";
import AppError from "../utils/AppError.js";

export const submitQuizAttempt = async (
  userId,
  quizId,
  answers
) => {
  // 1. Kiểm tra quiz có thuộc user không
  const quiz = await Quiz.findOne({
    _id: quizId,
    userId,
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  // 2. Lấy toàn bộ câu hỏi của quiz
  const questions = await QuizQuestion.find({
    quizId: quiz._id,
  }).sort({ createdAt: 1 });

  if (!questions.length) {
    throw new AppError("Quiz has no questions", 400);
  }

  // 3. Kiểm tra user gửi đủ câu trả lời
  // Có thể answer = null nếu user bỏ trống
  if (answers.length !== questions.length) {
    throw new AppError(
      `You must submit all ${questions.length} questions`,
      400
    );
  }

  // 4. Kiểm tra duplicate questionId
  const submittedQuestionIds = new Set(
    answers.map((item) => item.questionId)
  );

  if (submittedQuestionIds.size !== answers.length) {
    throw new AppError(
      "Duplicate question answers are not allowed",
      400
    );
  }

  // 5. Tạo map để lookup question nhanh
  const questionMap = new Map(
    questions.map((question) => [
      question._id.toString(),
      question,
    ])
  );

  // 6. Chấm điểm
  let correctAnswers = 0;

  const evaluatedAnswers = answers.map((item) => {
    const question = questionMap.get(
      item.questionId
    );

    if (!question) {
      throw new AppError(
        `Question ${item.questionId} does not belong to this quiz`,
        400
      );
    }

    // null, undefined hoặc "" đều được xem là bỏ trống
    const isAnswered =
      item.answer !== null &&
      item.answer !== undefined &&
      item.answer !== "";

    const isCorrect =
      isAnswered &&
      item.answer === question.correctAnswer;

    if (isCorrect) {
      correctAnswers++;
    }

    return {
      questionId: question._id,
      selectedAnswer: item.answer ?? null,
      correctAnswer: question.correctAnswer,
      isCorrect,
    };
  });

  const totalQuestions = questions.length;

  // Sai bao gồm cả câu trả lời sai và câu bỏ trống
  const wrongAnswers =
    totalQuestions - correctAnswers;

  const score = correctAnswers;

  const percentage =
    totalQuestions > 0
      ? Math.round(
        (correctAnswers / totalQuestions) * 100
      )
      : 0;

  // 7. Lưu attempt
  const attempt = await QuizAttempt.create({
    userId,
    quizId,
    answers: evaluatedAnswers,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    score,
    percentage,
    completedAt: new Date(),
  });

  return {
    attempt,
    questions,
  };
};

export const getQuizAttemptHistory = async (
  userId,
  quizId
) => {
  const quiz = await Quiz.findOne({
    _id: quizId,
    userId,
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return QuizAttempt.find({
    userId,
    quizId,
  })
    .select(
      "_id totalQuestions correctAnswers wrongAnswers score percentage completedAt createdAt"
    )
    .sort({ createdAt: -1 });
};

export const getQuizAttemptById = async (
  userId,
  attemptId
) => {
  const attempt = await QuizAttempt.findOne({
    _id: attemptId,
    userId,
  }).populate({
    path: "quizId",
    select: "title description totalQuestions difficulty subjectId",
  });

  if (!attempt) {
    throw new AppError(
      "Quiz attempt not found",
      404
    );
  }

  const questions = await QuizQuestion.find({
    quizId: attempt.quizId._id,
  })
    .select(
      "_id question options correctAnswer explanation difficulty"
    )
    .sort({ createdAt: 1 });

  const answerMap = new Map(
    attempt.answers.map((answer) => [
      answer.questionId.toString(),
      answer,
    ])
  );

  const results = questions.map((question) => {
    const answer = answerMap.get(
      question._id.toString()
    );

    return {
      questionId: question._id,
      question: question.question,
      options: question.options,
      selectedAnswer:
        answer?.selectedAnswer ?? null,
      correctAnswer: question.correctAnswer,
      isCorrect:
        answer?.isCorrect ?? false,
      explanation: question.explanation,
      difficulty: question.difficulty,
    };
  });

  return {
    attempt,
    results,
  };
};