import { z } from "zod";

export const submitQuizAttemptSchema = z.object({
    body: z.object({
        answers: z
            .array(
                z.object({
                    questionId: z.string().min(1),
                    answer: z.number().int().min(0).max(3),
                })
            )
            .min(1),
    }),

    params: z.object({
        quizId: z.string().min(1),
    }),
});