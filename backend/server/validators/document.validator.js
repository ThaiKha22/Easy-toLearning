import { z } from "zod";

export const createDocumentSchema = z.object({
  subjectId: z
    .string()
    .min(1, "Subject ID is required"),

  title: z
    .string()
    .trim()
    .min(1, "Document title is required")
    .max(200),
});

export const updateDocumentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .optional(),
});