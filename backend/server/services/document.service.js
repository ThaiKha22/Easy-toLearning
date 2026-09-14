import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/Quiz-attempt.js";
import QuizQuestion from "../models/Quiz-question.js";
import Subject from "../models/Subject.js";
import AppError from "../utils/AppError.js";
import cloudinary from "../config/cloudinary.js";

export const createDocument = async (
  userId,
  file,
  data
) => {
  const subject = await Subject.findOne({
    _id: data.subjectId,
    userId,
  });

  if (!subject) {
    throw new AppError(
      "Subject not found",
      404
    );
  }

  const document = await Document.create({
    userId,

    subjectId: data.subjectId,

    title:
      data.title ||
      file.originalname,

    originalName:
      file.originalname,

    publicId:
      file.filename,

    secureUrl:
      file.path,

    resourceType:"raw",

    mimeType:
      file.mimetype,

    fileSize:
      file.size,

    extension:
      `.${file.originalname
        .split(".")
        .pop()
        .toLowerCase()}`,

    processingStatus:
      "uploaded",
  });

  return document;
};

export const getDocuments = async (userId) => {
  return Document.find({
    userId,
  })
    .populate("subjectId", "name")
    .sort({
      createdAt: -1,
    });
};

export const getDocumentsBySubject = async (
  userId,
  subjectId
) => {
  return Document.find({
    userId,
    subjectId,
  }).sort({
    createdAt: -1,
  });
};

export const getDocumentById = async (
  userId,
  documentId
) => {
  const document = await Document.findOne({
    _id: documentId,
    userId,
  }).populate(
    "subjectId",
    "name"
  );

  if (!document) {
    throw new AppError(
      "Document not found",
      404
    );
  }

  return document;
};

export const updateDocument = async (
  userId,
  documentId,
  data
) => {
  const document =
    await Document.findOneAndUpdate(
      {
        _id: documentId,
        userId,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!document) {
    throw new AppError(
      "Document not found",
      404
    );
  }

  return document;
};

export const deleteDocument = async (
  userId,
  documentId
) => {
  const document =
    await Document.findOne({
      _id: documentId,
      userId,
    });

  if (!document) {
    throw new AppError(
      "Document not found",
      404
    );
  }

  await Document.deleteOne({
    _id: documentId,
    userId,
  });

  const quizzes = await Quiz.find({ documentId, userId }).select("_id");
  const quizIds = quizzes.map((quiz) => quiz._id);

  await Promise.all([
    Flashcard.deleteMany({ documentId, userId }),
    QuizAttempt.deleteMany({ quizId: { $in: quizIds }, userId }),
    QuizQuestion.deleteMany({ quizId: { $in: quizIds } }),
    Quiz.deleteMany({ _id: { $in: quizIds }, userId }),
  ]);

  try {
    await cloudinary.uploader.destroy(
      document.publicId,
      {
        resource_type:
          document.resourceType,
      }
    );
  } catch (error) {
    console.error("Failed to delete document file from Cloudinary:", error);
  }

  return document;
};