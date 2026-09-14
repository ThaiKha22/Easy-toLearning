import StudyPlan from "../models/study-plan.model.js";
import Subject from "../models/Subject.js";
import AppError from "../utils/AppError.js";

export const getSubjectProgress = async (
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

  const plans = await StudyPlan.find({
    userId,
    subjectId,
  });

  let totalTasks = 0;
  let completedTasks = 0;

  for (const plan of plans) {
    totalTasks += plan.tasks.length;

    completedTasks += plan.tasks.filter(
      (task) => task.completed
    ).length;
  }

  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  return {
    subjectId,
    subjectName: subject.name,
    progress,
    totalTasks,
    completedTasks,
  };
};

export const getProgressOverview = async (
  userId
) => {
  const subjects = await Subject.find({
    userId,
  }).select("_id name");

  const result = [];

  for (const subject of subjects) {
    const progress =
      await getSubjectProgress(
        userId,
        subject._id
      );

    result.push(progress);
  }

  return result;
};