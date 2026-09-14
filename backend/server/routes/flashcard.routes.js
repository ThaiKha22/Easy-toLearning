import express from "express";

import {
  getFlashcards,
  updateFlashcardController,
} from "../controllers/flashcard.controller.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  getFlashcards
);

router.patch(
  "/:flashcardId",
  updateFlashcardController
);

export default router;