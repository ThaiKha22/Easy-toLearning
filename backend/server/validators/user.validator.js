import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    avatar: z
      .string()
      .trim()
      .max(1000)
      .nullable()
      .optional(),

    bio: z
      .string()
      .trim()
      .max(500)
      .optional(),
  }),
});

export const updateLearningPreferencesSchema =
  z.object({
    body: z.object({
      dailyStudyGoal: z
        .number()
        .int()
        .min(0)
        .max(1440)
        .optional(),

      preferredStudyTime: z
        .enum([
          "morning",
          "afternoon",
          "evening",
          "night",
        ])
        .optional(),

      difficulty: z
        .enum([
          "easy",
          "medium",
          "hard",
        ])
        .optional(),

      language: z
        .enum(["vi", "en"])
        .optional(),
    }),
  });

export const updateNotificationSettingsSchema =
  z.object({
    body: z.object({
      studyReminders: z
        .boolean()
        .optional(),

      quizReminders: z
        .boolean()
        .optional(),

      aiRecommendations: z
        .boolean()
        .optional(),

      weeklyReports: z
        .boolean()
        .optional(),
    }),
  });

export const updateAppearanceSchema =
  z.object({
    body: z.object({
      theme: z.enum([
        "light",
        "dark",
        "system",
      ]),
    }),
  });

export const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z.string().min(1),

      newPassword: z
        .string()
        .min(8)
        .max(100),

      confirmPassword: z
        .string()
        .min(8)
        .max(100),
    })
    .refine(
      (data) =>
        data.newPassword ===
        data.confirmPassword,
      {
        message:
          "Passwords do not match",
        path: ["confirmPassword"],
      }
    ),
});