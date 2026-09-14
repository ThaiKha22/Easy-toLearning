import express from "express";

import {
  summarizeDocument,
  generateFlashcards,
  generateQuiz,
} from "../controllers/ai.controller.js";

import {
  generateFlashcardsSchema,
  generateQuizSchema,
} from "../validators/ai.validator.js";

import {validateRequest} from "../middleware/validate-request.middleware.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/documents/:documentId/summary",
  summarizeDocument
);

router.post(
  "/documents/:documentId/flashcards",
  validateRequest(generateFlashcardsSchema),
  generateFlashcards
);

router.post(
  "/documents/:documentId/quiz",
  validateRequest(generateQuizSchema),
  generateQuiz
);

export default router;