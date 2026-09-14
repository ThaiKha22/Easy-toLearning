import mongoose from "mongoose";

const quizAnswerSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizQuestion",
            required: true,
        },

        selectedAnswer: {
            type: Number,
            min: 0,
            max: 3,
            required: true,
        },

        correctAnswer: {
            type: Number,
            min: 0,
            max: 3,
            required: true,
        },

        isCorrect: {
            type: Boolean,
            required: true,
        },
    },
    { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
            index: true,
        },

        answers: {
            type: [quizAnswerSchema],
            required: true,
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
        },

        correctAnswers: {
            type: Number,
            required: true,
            min: 0,
        },

        wrongAnswers: {
            type: Number,
            required: true,
            min: 0,
        },

        score: {
            type: Number,
            required: true,
            min: 0,
        },

        percentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        completedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

quizAttemptSchema.index({
    userId: 1,
    quizId: 1,
    createdAt: -1,
});

const QuizAttempt = mongoose.model(
    "QuizAttempt",
    quizAttemptSchema
);

export default QuizAttempt;