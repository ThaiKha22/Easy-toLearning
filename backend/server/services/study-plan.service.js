import StudyPlan from "../models/study-plan.model.js";
import Subject from "../models/Subject.js";
import AppError from "../utils/AppError.js";

export const createStudyPlan = async (
  userId,
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

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    throw new AppError(
      "Invalid study plan dates",
      400
    );
  }

  if (startDate > endDate) {
    throw new AppError(
      "Start date must be before end date",
      400
    );
  }

  const studyPlan = await StudyPlan.create({
    userId,
    subjectId: data.subjectId,
    title: data.title,
    description: data.description || "",
    startDate,
    endDate,
    dailyStudyTime: data.dailyStudyTime,
    tasks: data.tasks || [],
  });

  return studyPlan;
};

export const getStudyPlans = async (userId) => {
  return StudyPlan.find({
    userId,
  })
    .populate("subjectId", "name")
    .sort({
      createdAt: -1,
    });
};

export const getStudyPlanById = async (
  userId,
  studyPlanId
) => {
  const studyPlan = await StudyPlan.findOne({
    _id: studyPlanId,
    userId,
  }).populate("subjectId", "name");

  if (!studyPlan) {
    throw new AppError(
      "Study plan not found",
      404
    );
  }

  return studyPlan;
};

export const updateStudyPlan = async (
  userId,
  studyPlanId,
  data
) => {
  const studyPlan = await StudyPlan.findOneAndUpdate(
    {
      _id: studyPlanId,
      userId,
    },
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate("subjectId", "name");

  if (!studyPlan) {
    throw new AppError(
      "Study plan not found",
      404
    );
  }

  return studyPlan;
};

export const deleteStudyPlan = async (
  userId,
  studyPlanId
) => {
  const studyPlan =
    await StudyPlan.findOneAndDelete({
      _id: studyPlanId,
      userId,
    });

  if (!studyPlan) {
    throw new AppError(
      "Study plan not found",
      404
    );
  }

  return studyPlan;
};

export const updateStudyPlanTask = async (
  userId,
  planId,
  taskId,
  completed
) => {
  const studyPlan = await StudyPlan.findOne({
    _id: planId,
    userId,
  });

  if (!studyPlan) {
    throw new AppError(
      "Study plan not found",
      404
    );
  }

  const task = studyPlan.tasks.id(taskId);

  if (!task) {
    throw new AppError(
      "Study task not found",
      404
    );
  }

  task.completed = completed;
  task.completedAt = completed
    ? new Date()
    : null;

  await studyPlan.save();

  return studyPlan;
};