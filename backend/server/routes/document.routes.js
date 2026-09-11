import express from "express";

import {
  createDocument,
  getDocuments,
  getDocumentsBySubject,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

import  validate  from "../middleware/validate.middleware.js";

import { validateBody } from "../middleware/validate-body.middleware.js";

import {
  createDocumentSchema,
  updateDocumentSchema,
} from "../validators/document.validator.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  getDocuments
);

router.get(
  "/subject/:subjectId",
  getDocumentsBySubject
);

router.post(
  "/upload",
  upload.single("file"),
  validateBody(createDocumentSchema),
  createDocument
);

router.get(
  "/:id",
  getDocumentById
);

router.patch(
  "/:id",
  validate(updateDocumentSchema),
  updateDocument
);

router.delete(
  "/:id",
  deleteDocument
);

export default router;