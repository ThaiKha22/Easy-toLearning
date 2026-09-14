import {
  getSubjectProgress,
  getProgressOverview,
} from "../services/progress.service.js";

export const getSubjectProgressController =
  async (req, res, next) => {
    try {
      const progress =
        await getSubjectProgress(
          req.user.id,
          req.params.subjectId
        );

      res.status(200).json({
        success: true,
        data: {
          progress,
        },
      });
    } catch (error) {
      next(error);
    }
  };

export const getProgressOverviewController =
  async (req, res, next) => {
    try {
      const subjects =
        await getProgressOverview(
          req.user.id
        );

      res.status(200).json({
        success: true,
        data: {
          subjects,
        },
      });
    } catch (error) {
      next(error);
    }
  };