import express from "express";

import {
  getAnalyticsOverview,
  getStudyTimeAnalytics,
  getQuizPerformanceAnalytics,
  getSubjectAnalytics,
} from "../controllers/analytics.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/overview",
  getAnalyticsOverview
);

router.get(
  "/study-time",
  getStudyTimeAnalytics
);

router.get(
  "/quiz-performance",
  getQuizPerformanceAnalytics
);

router.get(
  "/subjects",
  getSubjectAnalytics
);


export default router;