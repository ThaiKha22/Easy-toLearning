import Quiz from "../models/Quiz.js";
import QuizQuestion from "../models/Quiz-question.js";

import AppError from "../utils/AppError.js";

export const getQuizzes = async (userId, subjectId) => {
    const filter = { userId };
    if (subjectId) filter.subjectId = subjectId;

    const quizzes = await Quiz.find(filter)
        .populate("subjectId", "name")
        .populate("documentId", "title originalName")
        .sort({ createdAt: -1 });

    return quizzes;
};

export const getQuizById = async (
    userId,
    quizId
) => {
    const quiz = await Quiz.findOne({
        _id: quizId,
        userId,
    })
        .populate("subjectId", "name")
        .populate(
            "documentId",
            "title originalName"
        );

    if (!quiz) {
        throw new AppError(
            "Quiz not found",
            404
        );
    }

    const questions =
        await QuizQuestion.find({
            quizId: quiz._id,
        })
            .select(
                "_id question options difficulty createdAt"
            )
            .sort({
                createdAt: 1,
            });

    return {
        quiz,
        questions,
    };
};