import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate-request.middleware.js";

import {
    submitQuizAttempt,
    getQuizAttemptHistory,
    getQuizAttemptById,
} from "../controllers/quiz-attempt.controller.js";

import {
    submitQuizAttemptSchema,
} from "../validators/quiz-attempt.validator.js";

const router = express.Router();

router.use(authenticate);

router.post(
    "/:quizId/attempts",
    validateRequest(submitQuizAttemptSchema),
    submitQuizAttempt
);

// Quiz attempt history
router.get(
    "/:quizId/attempts",
    getQuizAttemptHistory
);

// Attempt detail
router.get(
    "/attempts/:attemptId",
    getQuizAttemptById
);

export default router;