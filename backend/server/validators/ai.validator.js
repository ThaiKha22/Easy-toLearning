import { z } from "zod";

export const generateFlashcardsSchema =
  z.object({
    body: z.object({
      numberOfCards: z
        .number()
        .int()
        .min(5)
        .max(50)
        .default(10),
    }),

    params: z.object({
      documentId: z.string().min(1),
    }),
  });

export const generateQuizSchema = z.object({
  body: z.object({
    numberOfQuestions: z
      .number()
      .int()
      .min(5)
      .max(50)
      .default(10),
  }),

  params: z.object({
    documentId: z.string().min(1),
  }),
});