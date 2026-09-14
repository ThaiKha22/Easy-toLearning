import {
    getFlashcards as getFlashcardsService,
} from "../services/flashcard.service.js";

import { updateFlashcard } from "../services/flashcard.service.js";

export const getFlashcards = async (
    req,
    res,
    next
) => {
    try {
        const flashcards =
            await getFlashcardsService(
                req.user.id,
                req.query
            );

        res.json({
            success: true,
            data: {
                flashcards,
                count: flashcards.length,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const updateFlashcardController = async (req, res, next) => {
  try {
    const { flashcardId } = req.params;
    const userId = req.user.id;

    const flashcard = await updateFlashcard(
      userId,
      flashcardId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Flashcard updated successfully",
      data: flashcard,
    });
  } catch (error) {
    next(error);
  }
};
