import { z } from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(200),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  date: z.string().min(1),

  duration: z
    .number()
    .int()
    .min(1)
    .max(1440)
    .optional(),

  type: z
    .enum([
      "reading",
      "flashcard",
      "quiz",
      "review",
      "other",
    ])
    .optional(),

  completed: z.boolean().optional(),
});

export const createStudyPlanSchema = z.object({
  body: z.object({
    subjectId: z.string().min(1),

    title: z
      .string()
      .trim()
      .min(1)
      .max(200),

    description: z
      .string()
      .trim()
      .max(1000)
      .optional(),

    startDate: z.string().min(1),

    endDate: z.string().min(1),

    dailyStudyTime: z
      .number()
      .int()
      .min(1)
      .max(1440),

    tasks: z
      .array(taskSchema)
      .optional(),
  }),
});

export const updateStudyPlanSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000)
      .optional(),

    startDate: z.string().optional(),

    endDate: z.string().optional(),

    dailyStudyTime: z
      .number()
      .int()
      .min(1)
      .max(1440)
      .optional(),

    status: z
      .enum([
        "draft",
        "active",
        "completed",
        "archived",
      ])
      .optional(),

    tasks: z
      .array(taskSchema)
      .optional(),
  }),

  params: z.object({
    id: z.string().min(1),
  }),
});

export const updateStudyTaskSchema = z.object({
  body: z.object({
    completed: z.boolean(),
  }),

  params: z.object({
    planId: z.string().min(1),
    taskId: z.string().min(1),
  }),
});