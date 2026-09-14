import { z } from "zod";

export const createStudySessionSchema = z.object({
  body: z.object({
    subjectId: z.string().min(1),

    documentId: z.string().optional().nullable(),

    studyPlanId: z.string().optional().nullable(),

    taskId: z.string().optional().nullable(),

    startedAt: z.string().min(1),

    endedAt: z.string().min(1),

    duration: z
      .number()
      .int()
      .min(1)
      .max(1440),

    type: z
      .enum([
        "reading",
        "flashcard",
        "quiz",
        "review",
        "other",
      ])
      .optional(),

    notes: z
      .string()
      .trim()
      .max(1000)
      .optional(),
  }),
});