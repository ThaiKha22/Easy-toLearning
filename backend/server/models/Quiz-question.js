import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },

        question: {
            type: String,
            required: true,
            trim: true,
        },

        options: {
            type: [
                {
                    type: String,
                    trim: true,
                },
            ],
            validate: {
                validator: (value) => value.length === 4,
                message: "A question must have exactly 4 options",
            },
        },

        correctAnswer: {
            type: Number,
            required: true,
            min: 0,
            max: 3,
        },

        explanation: {
            type: String,
            default: "",
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
        },
    },
    {
        timestamps: true,
    }
);

quizQuestionSchema.index({
    quizId: 1,
});

const QuizQuestion = mongoose.model(
    "QuizQuestion",
    quizQuestionSchema
);

export default QuizQuestion;