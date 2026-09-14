import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate-request.middleware.js";

import {
  createStudySession,
  getStudySessions,
  getStudyTimeSummary,
} from "../controllers/study-session.controller.js";

import {
  createStudySessionSchema,
} from "../validators/study-session.validator.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  getStudySessions
);

router.get(
  "/summary",
  getStudyTimeSummary
);

router.post(
  "/",
  validateRequest(createStudySessionSchema),
  createStudySession
);

export default router;