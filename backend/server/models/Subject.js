import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    examDate: {
      type: Date,
      default: null,
    },

    dailyStudyTime: {
      type: Number,
      min: 0,
      max: 1440,
      default: 60,
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

subjectSchema.index({
  userId: 1,
  createdAt: -1,
});

const Subject = mongoose.model(
  "Subject",
  subjectSchema
);

export default Subject;