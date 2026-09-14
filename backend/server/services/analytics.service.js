import StudySession from "../models/study-session.model.js";
import StudyPlan from "../models/study-plan.model.js";
import Subject from "../models/Subject.js";
import QuizAttempt from "../models/Quiz-attempt.js";

export const getAnalyticsOverview = async (userId) => {
  const [
    studySummary,
    quizSummary,
    taskSummary,
    subjectCount,
  ] = await Promise.all([
    StudySession.aggregate([
      {
        $match: {
          userId,
        },
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
    ]),

    QuizAttempt.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: null,
          totalAttempts: {
            $sum: 1,
          },
          averagePercentage: {
            $avg: "$percentage",
          },
          bestPercentage: {
            $max: "$percentage",
          },
        },
      },
    ]),

    StudyPlan.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $unwind: {
          path: "$tasks",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: null,
          totalTasks: {
            $sum: 1,
          },
          completedTasks: {
            $sum: {
              $cond: [
                "$tasks.completed",
                1,
                0,
              ],
            },
          },
        },
      },
    ]),

    Subject.countDocuments({
      userId,
    }),
  ]);

  const study = studySummary[0] || {
    totalMinutes: 0,
    totalSessions: 0,
  };

  const quiz = quizSummary[0] || {
    totalAttempts: 0,
    averagePercentage: 0,
    bestPercentage: 0,
  };

  const tasks = taskSummary[0] || {
    totalTasks: 0,
    completedTasks: 0,
  };

  return {
    study: {
      totalMinutes: study.totalMinutes,
      totalSessions: study.totalSessions,
      totalHours: Number(
        (study.totalMinutes / 60).toFixed(1)
      ),
    },

    quiz: {
      totalAttempts: quiz.totalAttempts,
      averagePercentage: Number(
        (quiz.averagePercentage || 0).toFixed(1)
      ),
      bestPercentage: quiz.bestPercentage || 0,
    },

    tasks: {
      totalTasks: tasks.totalTasks,
      completedTasks: tasks.completedTasks,
      completionPercentage:
        tasks.totalTasks > 0
          ? Math.round(
              (tasks.completedTasks /
                tasks.totalTasks) *
                100
            )
          : 0,
    },

    subjects: {
      total: subjectCount,
    },
  };
};

export const getStudyTimeAnalytics = async (
  userId,
  days = 7
) => {
  const startDate = new Date();

  startDate.setDate(
    startDate.getDate() - (days - 1)
  );

  startDate.setHours(0, 0, 0, 0);

  const result = await StudySession.aggregate([
    {
      $match: {
        userId,
        startedAt: {
          $gte: startDate,
        },
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$startedAt",
          },
        },

        totalMinutes: {
          $sum: "$duration",
        },

        totalSessions: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return result.map((item) => ({
    date: item._id,
    totalMinutes: item.totalMinutes,
    totalSessions: item.totalSessions,
  }));
};

export const getQuizPerformanceAnalytics = async (
  userId,
  limit = 10
) => {
  const attempts = await QuizAttempt.find({
    userId,
  })
    .populate({
      path: "quizId",
      select: "title",
    })
    .select(
      "_id quizId score percentage correctAnswers wrongAnswers completedAt"
    )
    .sort({
      completedAt: -1,
    })
    .limit(limit);

  return attempts.map((attempt) => ({
    attemptId: attempt._id,
    quizId: attempt.quizId?._id,
    quizTitle: attempt.quizId?.title || "Quiz",
    score: attempt.score,
    percentage: attempt.percentage,
    correctAnswers: attempt.correctAnswers,
    wrongAnswers: attempt.wrongAnswers,
    completedAt: attempt.completedAt,
  }));
};

export const getSubjectAnalytics = async (userId) => {
  const subjects = await Subject.find({
    userId,
  }).select("_id name");

  const result = [];

  for (const subject of subjects) {
    const [study, quiz, plans] =
      await Promise.all([
        StudySession.aggregate([
          {
            $match: {
              userId,
              subjectId: subject._id,
            },
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
        ]),

        QuizAttempt.aggregate([
          {
            $match: {
              userId,
            },
          },
          {
            $lookup: {
              from: "quizzes",
              localField: "quizId",
              foreignField: "_id",
              as: "quiz",
            },
          },
          {
            $unwind: "$quiz",
          },
          {
            $match: {
              "quiz.subjectId": subject._id,
            },
          },
          {
            $group: {
              _id: null,
              averagePercentage: {
                $avg: "$percentage",
              },
              totalAttempts: {
                $sum: 1,
              },
            },
          },
        ]),

        StudyPlan.find({
          userId,
          subjectId: subject._id,
        }).select("tasks"),
      ]);

    let totalTasks = 0;
    let completedTasks = 0;

    for (const plan of plans) {
      totalTasks += plan.tasks.length;

      completedTasks += plan.tasks.filter(
        (task) => task.completed
      ).length;
    }

    result.push({
      subjectId: subject._id,
      subjectName: subject.name,

      studyMinutes:
        study[0]?.totalMinutes || 0,

      studySessions:
        study[0]?.totalSessions || 0,

      quizAttempts:
        quiz[0]?.totalAttempts || 0,

      averageQuizPercentage:
        Number(
          (quiz[0]?.averagePercentage || 0).toFixed(1)
        ),

      progress:
        totalTasks > 0
          ? Math.round(
              (completedTasks / totalTasks) *
                100
            )
          : 0,

      totalTasks,
      completedTasks,
    });
  }

  return result;
};