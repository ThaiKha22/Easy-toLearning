import mongoose from "mongoose";

const learningPreferencesSchema = new mongoose.Schema(
  {
    dailyStudyGoal: {
      type: Number,
      default: 60,
      min: 0,
    },

    preferredStudyTime: {
      type: String,
      default: "evening",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    language: {
      type: String,
      default: "vi",
    },
  },
  { _id: false }
);

const notificationSettingsSchema = new mongoose.Schema(
  {
    studyReminders: {
      type: Boolean,
      default: true,
    },

    quizReminders: {
      type: Boolean,
      default: true,
    },

    aiRecommendations: {
      type: Boolean,
      default: true,
    },

    weeklyReports: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const appearanceSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    avatar: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    learningPreferences: {
      type: learningPreferencesSchema,
      default: () => ({}),
    },

    notificationSettings: {
      type: notificationSettingsSchema,
      default: () => ({}),
    },

    appearance: {
      type: appearanceSchema,
      default: () => ({}),
    },

    refreshTokenHash: {
      type: String,
      default: null,
      select: false,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;