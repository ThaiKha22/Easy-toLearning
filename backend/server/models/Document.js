import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
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

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    secureUrl: {
      type: String,
      required: true,
    },

    resourceType: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },

    extension: {
      type: String,
      required: true,
      lowercase: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    processingStatus: {
      type: String,
      enum: [
        "uploaded",
        "processing",
        "completed",
        "failed",
      ],
      default: "uploaded",
    },

    processingError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

documentSchema.index({
  userId: 1,
  subjectId: 1,
  createdAt: -1,
});

const Document = mongoose.model(
  "Document",
  documentSchema
);

export default Document;