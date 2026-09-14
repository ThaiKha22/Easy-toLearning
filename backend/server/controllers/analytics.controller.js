import {
  getAnalyticsOverview as getAnalyticsOverviewService,
  getStudyTimeAnalytics as getStudyTimeAnalyticsService,
  getQuizPerformanceAnalytics as getQuizPerformanceAnalyticsService,
  getSubjectAnalytics as getSubjectAnalyticsService,
} from "../services/analytics.service.js";

export const getAnalyticsOverview = async (
  req,
  res,
  next
) => {
  try {
    const analytics =
      await getAnalyticsOverviewService(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: {
        analytics,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudyTimeAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const days = Number(req.query.days) || 7;

    const analytics =
      await getStudyTimeAnalyticsService(
        req.user.id,
        days
      );

    res.status(200).json({
      success: true,
      data: {
        analytics,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizPerformanceAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const limit =
      Number(req.query.limit) || 10;

    const analytics =
      await getQuizPerformanceAnalyticsService(
        req.user.id,
        limit
      );

    res.status(200).json({
      success: true,
      data: {
        analytics,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const analytics =
      await getSubjectAnalyticsService(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: {
        analytics,
      },
    });
  } catch (error) {
    next(error);
  }
};