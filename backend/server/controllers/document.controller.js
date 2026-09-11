import {
  createDocument as createDocumentService,
  getDocuments as getDocumentsService,
  getDocumentsBySubject as getDocumentsBySubjectService,
  getDocumentById as getDocumentByIdService,
  updateDocument as updateDocumentService,
  deleteDocument as deleteDocumentService,
} from "../services/document.service.js";
import { processDocument } from "../services/document-processing.service.js";

export const createDocument = async (
  req,
  res,
  next
) => {
  try {
    console.log("REQ.FILE:", req.file);
    console.log("REQ.BODY:", req.body);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const document =
      await createDocumentService(
        req.user.id,
        req.file,
        req.validatedBody
      );
    await processDocument(document._id);

    res.status(201).json({
      success: true,
      message:
        "Document uploaded successfully",
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDocuments = async (
  req,
  res,
  next
) => {
  try {
    const documents =
      await getDocumentsService(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: {
        documents,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentsBySubject = async (
  req,
  res,
  next
) => {
  try {
    const documents =
      await getDocumentsBySubjectService(
        req.user.id,
        req.params.subjectId
      );

    res.status(200).json({
      success: true,
      data: {
        documents,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentById = async (
  req,
  res,
  next
) => {
  try {
    const document =
      await getDocumentByIdService(
        req.user.id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateDocument = async (
  req,
  res,
  next
) => {
  try {
    const document =
      await updateDocumentService(
        req.user.id,
        req.params.id,
        req.validated.body
      );

    res.status(200).json({
      success: true,
      message:
        "Document updated successfully",
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (
  req,
  res,
  next
) => {
  try {
    await deleteDocumentService(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};