import {
    getQuizzes as getQuizzesService,
    getQuizById,
} from "../services/quiz.service.js";

export const getQuizzes = async (
    req,
    res,
    next
) => {
    try {
        const quizzes = await getQuizzesService(
            req.user.id,
            req.query.subjectId
        );

        res.status(200).json({
            success: true,
            data: {
                quizzes,
                count: quizzes.length,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getQuiz = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await getQuizById(
                req.user.id,
                req.params.id
            );

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};