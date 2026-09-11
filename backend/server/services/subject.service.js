import Subject from "../models/Subject.js";
import AppError from "../utils/AppError.js";

export const createSubject = async (
  userId,
  data
) => {
  const subject = await Subject.create({
    userId,
    name: data.name,
    description: data.description || "",
    examDate: data.examDate || null,
    dailyStudyTime:
      data.dailyStudyTime ?? 60,
  });

  return subject;
};

export const getSubjects = async (
  userId
) => {
  return Subject.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

export const getSubjectById = async (
  userId,
  subjectId
) => {
  const subject = await Subject.findOne({
    _id: subjectId,
    userId,
  });

  if (!subject) {
    throw new AppError(
      "Subject not found",
      404
    );
  }

  return subject;
};

export const updateSubject = async (
  userId,
  subjectId,
  data
) => {
  const subject =
    await Subject.findOneAndUpdate(
      {
        _id: subjectId,
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

  if (!subject) {
    throw new AppError(
      "Subject not found",
      404
    );
  }

  return subject;
};

export const deleteSubject = async (
  userId,
  subjectId
) => {
  const subject =
    await Subject.findOneAndDelete({
      _id: subjectId,
      userId,
    });

  if (!subject) {
    throw new AppError(
      "Subject not found",
      404
    );
  }

  return subject;
};