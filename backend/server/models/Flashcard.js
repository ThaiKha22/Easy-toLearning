import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
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

        question: {
            type: String,
            required: true,
            trim: true,
        },

        answer: {
            type: String,
            required: true,
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
        },

        status: {
            type: String,
            enum: ["new", "learning", "known"],
            default: "new",
        },

        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        lastReviewedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

flashcardSchema.index({
    userId: 1,
    documentId: 1,
    createdAt: -1,
});

const Flashcard = mongoose.model(
    "Flashcard",
    flashcardSchema
);

export default Flashcard;