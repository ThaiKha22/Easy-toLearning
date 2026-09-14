import {
  submitQuizAttempt as submitQuizAttemptService,
  getQuizAttemptHistory as getQuizAttemptHistoryService,
  getQuizAttemptById as getQuizAttemptByIdService,
} from "../services/quiz-attempt.service.js";

export const submitQuizAttempt = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await submitQuizAttemptService(
                req.user.id,
                req.params.quizId,
                req.validated.body.answers
            );

        res.status(201).json({
            success: true,
            message: "Quiz submitted successfully",
            data: {
                attempt: result.attempt,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getQuizAttemptHistory = async (
  req,
  res,
  next
) => {
  try {
    const attempts =
      await getQuizAttemptHistoryService(
        req.user.id,
        req.params.quizId
      );

    res.status(200).json({
      success: true,
      data: {
        attempts,
        count: attempts.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizAttemptById = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await getQuizAttemptByIdService(
        req.user.id,
        req.params.attemptId
      );

    res.status(200).json({
      success: true,
      data: {
        attempt: result.attempt,
        results: result.results,
      },
    });
  } catch (error) {
    next(error);
  }
};