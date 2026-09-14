import express from "express";

import {
  getMyProfile,
  updateMyProfile,
  updateLearningPreferences,
  updateNotificationSettings,
  updateAppearance,
  changePassword,
} from "../controllers/user.controller.js";

import {
  updateProfileSchema,
  updateLearningPreferencesSchema,
  updateNotificationSettingsSchema,
  updateAppearanceSchema,
  changePasswordSchema,
} from "../validators/user.validator.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate-request.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/me",
  getMyProfile
);

router.patch(
  "/me",
  validateRequest(updateProfileSchema),
  updateMyProfile
);

router.patch(
  "/me/preferences",
  validateRequest(updateLearningPreferencesSchema),
  updateLearningPreferences
);

router.patch(
  "/me/notifications",
  validateRequest(updateNotificationSettingsSchema),
  updateNotificationSettings
);

router.patch(
  "/me/appearance",
  validateRequest(updateAppearanceSchema),
  updateAppearance
);

router.patch(
  "/me/password",
  validateRequest(changePasswordSchema),
  changePassword
);

export default router;