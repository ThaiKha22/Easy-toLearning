import express from "express";

import {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import  validate  from "../middleware/validate.middleware.js";

import {
  createSubjectSchema,
  updateSubjectSchema,
} from "../validators/subject.validator.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  getSubjects
);

router.post(
  "/",
  validate(createSubjectSchema),
  createSubject
);

router.get(
  "/:id",
  getSubjectById
);

router.patch(
  "/:id",
  validate(updateSubjectSchema),
  updateSubject
);

router.delete(
  "/:id",
  deleteSubject
);

export default router;