import {
  createStudySession as createStudySessionService,
  getStudySessions as getStudySessionsService,
  getStudyTimeSummary as getStudyTimeSummaryService,
} from "../services/study-session.service.js";

export const createStudySession = async (
  req,
  res,
  next
) => {
  try {
    const session =
      await createStudySessionService(
        req.user.id,
        req.validated.body
      );

    res.status(201).json({
      success: true,
      message: "Study session created successfully",
      data: {
        session,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudySessions = async (
  req,
  res,
  next
) => {
  try {
    const sessions =
      await getStudySessionsService(
        req.user.id,
        req.query
      );

    res.status(200).json({
      success: true,
      data: {
        sessions,
        count: sessions.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudyTimeSummary = async (
  req,
  res,
  next
) => {
  try {
    const summary =
      await getStudyTimeSummaryService(
        req.user.id,
        req.query.subjectId
      );

    res.status(200).json({
      success: true,
      data: {
        summary,
      },
    });
  } catch (error) {
    next(error);
  }
};