import StudySession from "../models/study-session.model.js";
import Subject from "../models/Subject.js";
import Document from "../models/Document.js";
import StudyPlan from "../models/study-plan.model.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";

export const createStudySession = async (
  userId,
  data
) => {
  // Kiểm tra Subject
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

  // Nếu có document → kiểm tra ownership
  if (data.documentId) {
    const document = await Document.findOne({
      _id: data.documentId,
      userId,
      subjectId: data.subjectId,
    });

    if (!document) {
      throw new AppError(
        "Document not found",
        404
      );
    }
  }

  // Nếu có Study Plan → kiểm tra ownership
  if (data.studyPlanId) {
    const studyPlan = await StudyPlan.findOne({
      _id: data.studyPlanId,
      userId,
      subjectId: data.subjectId,
    });

    if (!studyPlan) {
      throw new AppError(
        "Study plan not found",
        404
      );
    }
  }

  const startedAt = new Date(data.startedAt);
  const endedAt = new Date(data.endedAt);

  if (
    Number.isNaN(startedAt.getTime()) ||
    Number.isNaN(endedAt.getTime())
  ) {
    throw new AppError(
      "Invalid session dates",
      400
    );
  }

  if (endedAt <= startedAt) {
    throw new AppError(
      "End time must be after start time",
      400
    );
  }

  const calculatedDuration = Math.ceil(
    (endedAt - startedAt) / (1000 * 60)
  );

  if (calculatedDuration !== data.duration) {
    throw new AppError(
      "Duration does not match start and end time",
      400
    );
  }

  const studySession =
    await StudySession.create({
      userId,
      subjectId: data.subjectId,
      documentId: data.documentId || null,
      studyPlanId: data.studyPlanId || null,
      taskId: data.taskId || null,
      startedAt,
      endedAt,
      duration: data.duration,
      type: data.type || "other",
      notes: data.notes || "",
    });

  return studySession;
};

export const getStudySessions = async (
  userId,
  filters = {}
) => {
  const query = {
    userId,
  };

  if (filters.subjectId) {
    query.subjectId = filters.subjectId;
  }

  if (filters.type) {
    query.type = filters.type;
  }

  return StudySession.find(query)
    .populate("subjectId", "name")
    .populate(
      "documentId",
      "title originalName"
    )
    .sort({
      startedAt: -1,
    });
};

export const getStudyTimeSummary = async (
  userId,
  subjectId = null
) => {
  const match = {
    userId,
  };

  if (subjectId) {
    match.subjectId =
      new mongoose.Types.ObjectId(subjectId);
  }

  const result =
    await StudySession.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: null,
          totalMinutes: {
            $sum: "$duration",
          },
          totalSessions: {
            $sum: 1,
          },
        },
      },
    ]);

  return (
    result[0] || {
      totalMinutes: 0,
      totalSessions: 0,
    }
  );
};