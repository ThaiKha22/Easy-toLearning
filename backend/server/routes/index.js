import express from "express";
import authRoutes from "./auth.routes.js";
import subjectRoutes from "./subject.routes.js";
import documentRoutes from "./document.routes.js";
import aiRoutes from "./ai.routes.js";
import flashcardRoutes from "./flashcard.routes.js";
import quizRoutes from "./quiz.routes.js";
import quizAttemptRoutes from "./quiz-attempt.routes.js";
import studyPlanRoutes from "./study-plan.routes.js";
import studySessionRoutes from "./study-session.routes.js";
import progressRoutes from "./progress.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/subjects", subjectRoutes);
router.use("/ai", aiRoutes);
router.use("/documents", documentRoutes);
router.use("/flashcards", flashcardRoutes);
router.use("/quizzes", quizRoutes);
router.use("/quizzes", quizAttemptRoutes);
router.use("/study-plans", studyPlanRoutes);
router.use("/study-sessions", studySessionRoutes);
router.use("/progress", progressRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/users", userRoutes);

export default router;