import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Subject name is required")
    .max(100),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  examDate: z
    .string()
    .optional()
    .nullable(),

  dailyStudyTime: z
    .number()
    .min(0)
    .max(1440)
    .optional(),
});

export const updateSubjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .optional(),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  examDate: z
    .string()
    .optional()
    .nullable(),

  dailyStudyTime: z
    .number()
    .min(0)
    .max(1440)
    .optional(),

  status: z
    .enum([
      "active",
      "completed",
      "archived",
    ])
    .optional(),
});