import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate-request.middleware.js";

import {
    createStudyPlan,
    getStudyPlans,
    getStudyPlanById,
    updateStudyPlan,
    deleteStudyPlan,
    updateStudyPlanTask,
} from "../controllers/study-plan.controller.js";

import {
    createStudyPlanSchema,
    updateStudyPlanSchema,
    updateStudyTaskSchema,
} from "../validators/study-plan.validator.js";

const router = express.Router();

router.use(authenticate);

router.get(
    "/",
    getStudyPlans
);

router.post(
    "/",
    validateRequest(createStudyPlanSchema),
    createStudyPlan
);

router.get(
    "/:id",
    getStudyPlanById
);

router.patch(
    "/:id",
    validateRequest(updateStudyPlanSchema),
    updateStudyPlan
);

router.delete(
    "/:id",
    deleteStudyPlan
);

router.patch(
  "/:planId/tasks/:taskId",
  validateRequest(updateStudyTaskSchema),
  updateStudyPlanTask
);

export default router;