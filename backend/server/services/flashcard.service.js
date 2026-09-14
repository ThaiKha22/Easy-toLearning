import Flashcard from "../models/Flashcard.js";
import AppError from "../utils/AppError.js";

export const getFlashcards = async (
    userId,
    filters = {}
) => {
    const query = {
        userId,
    };

    if (filters.documentId) {
        query.documentId = filters.documentId;
    }

    if (filters.subjectId) {
        query.subjectId = filters.subjectId;
    }

    if (filters.status) {
        query.status = filters.status;
    }

    return Flashcard.find(query)
        .populate("subjectId", "name")
        .populate(
            "documentId",
            "title originalName"
        )
        .sort({
            createdAt: -1,
        });
};

export const updateFlashcard = async (
  userId,
  flashcardId,
  data
) => {
  const flashcard =
    await Flashcard.findOneAndUpdate(
      {
        _id: flashcardId,
        userId,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!flashcard) {
    throw new AppError(
      "Flashcard not found",
      404
    );
  }

  return flashcard;
};