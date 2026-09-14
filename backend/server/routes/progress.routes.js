import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";

import {
  getSubjectProgressController,
  getProgressOverviewController,
} from "../controllers/progress.controller.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  getProgressOverviewController
);

router.get(
  "/subjects/:subjectId",
  getSubjectProgressController
);

export default router;