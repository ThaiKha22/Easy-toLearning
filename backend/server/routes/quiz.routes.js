import express from "express";

import {
    getQuizzes,
    getQuiz,
} from "../controllers/quiz.controller.js";

import {
    authenticate,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get(
    "/",
    getQuizzes
);

router.get(
    "/:id",
    getQuiz
);

export default router;