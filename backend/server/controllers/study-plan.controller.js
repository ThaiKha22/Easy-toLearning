import {
  createStudyPlan as createStudyPlanService,
  getStudyPlans as getStudyPlansService,
  getStudyPlanById as getStudyPlanByIdService,
  updateStudyPlan as updateStudyPlanService,
  deleteStudyPlan as deleteStudyPlanService,
  updateStudyPlanTask as updateStudyPlanTaskService,
} from "../services/study-plan.service.js";

export const createStudyPlan = async (
  req,
  res,
  next
) => {
  try {
    const studyPlan =
      await createStudyPlanService(
        req.user.id,
        req.validated.body
      );

    res.status(201).json({
      success: true,
      message: "Study plan created successfully",
      data: {
        studyPlan,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudyPlans = async (
  req,
  res,
  next
) => {
  try {
    const studyPlans =
      await getStudyPlansService(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: {
        studyPlans,
        count: studyPlans.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudyPlanById = async (
  req,
  res,
  next
) => {
  try {
    const studyPlan =
      await getStudyPlanByIdService(
        req.user.id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: {
        studyPlan,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudyPlan = async (
  req,
  res,
  next
) => {
  try {
    const studyPlan =
      await updateStudyPlanService(
        req.user.id,
        req.params.id,
        req.validated.body
      );

    res.status(200).json({
      success: true,
      message: "Study plan updated successfully",
      data: {
        studyPlan,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudyPlan = async (
  req,
  res,
  next
) => {
  try {
    await deleteStudyPlanService(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Study plan deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudyPlanTask = async (
  req,
  res,
  next
) => {
  try {
    const studyPlan =
      await updateStudyPlanTaskService(
        req.user.id,
        req.params.planId,
        req.params.taskId,
        req.validated.body.completed
      );

    res.status(200).json({
      success: true,
      message: "Study task updated successfully",
      data: {
        studyPlan,
      },
    });
  } catch (error) {
    next(error);
  }
};