import mongoose from "mongoose";

const studyTaskSchema = new mongoose.Schema(
  {
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
      maxlength: 500,
    },

    date: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      default: 30,
      min: 1,
      max: 1440,
    },

    type: {
      type: String,
      enum: [
        "reading",
        "flashcard",
        "quiz",
        "review",
        "other",
      ],
      default: "other",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: true,
  }
);

const studyPlanSchema = new mongoose.Schema(
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

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    dailyStudyTime: {
      type: Number,
      required: true,
      min: 1,
      max: 1440,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "active",
        "completed",
        "archived",
      ],
      default: "active",
    },

    tasks: {
      type: [studyTaskSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

studyPlanSchema.index({
  userId: 1,
  subjectId: 1,
  createdAt: -1,
});

const StudyPlan = mongoose.model(
  "StudyPlan",
  studyPlanSchema
);

export default StudyPlan;