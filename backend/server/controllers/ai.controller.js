import {
  generateDocumentSummary,
} from "../services/ai-summary.service.js";
import {
  generateFlashcards as generateFlashcardsService,
} from "../services/ai-flashcard.service.js";
import {
  generateQuiz as generateQuizService,
} from "../services/ai-quiz.service.js";

export const summarizeDocument = async (
  req,
  res,
  next
) => {
  try {
    const result = await generateDocumentSummary(
      req.user.id,
      req.params.documentId
    );

    res.json({
      success: true,
      message: "Document summarized successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const generateFlashcards = async (
  req,
  res,
  next
) => {
  try {
    const cards =
      await generateFlashcardsService(
        req.user.id,
        req.params.documentId,
        req.validated.body.numberOfCards
      );

    res.status(201).json({
      success: true,
      message:
        "Flashcards generated successfully",
      data: {
        flashcards: cards,
        count: cards.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const generateQuiz = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await generateQuizService(
        req.user.id,
        req.params.documentId,
        req.validated.body.numberOfQuestions
      );

    res.status(201).json({
      success: true,
      message: "Quiz generated successfully",

      data: {
        quiz: result.quiz,
        questions: result.questions,
      },
    });
  } catch (error) {
    next(error);
  }
};