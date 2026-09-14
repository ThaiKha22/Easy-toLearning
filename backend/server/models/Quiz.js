import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
            index: true,
        },

        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard", "mixed"],
            default: "mixed",
        },

        status: {
            type: String,
            enum: ["draft", "ready", "completed"],
            default: "ready",
        },
    },
    {
        timestamps: true,
    }
);

quizSchema.index({
    userId: 1,
    documentId: 1,
    createdAt: -1,
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;