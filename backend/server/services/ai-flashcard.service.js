import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import AppError from "../utils/AppError.js";

import { generateJSON } from "./gemini.service.js";

export const generateFlashcards = async (
    userId,
    documentId,
    numberOfCards = 10
) => {
    const document = await Document.findOne({
        _id: documentId,
        userId,
    });

    if (!document) {
        throw new AppError(
            "Document not found",
            404
        );
    }

    if (!document.extractedText) {
        throw new AppError(
            "Document has no extracted text",
            400
        );
    }

    const prompt = `
Bạn là một trợ lý học tập AI.

Hãy đọc nội dung tài liệu bên dưới và tạo ${numberOfCards}
flashcard giúp sinh viên ôn tập.

Yêu cầu:

- Viết bằng tiếng Việt.
- Chỉ sử dụng thông tin có trong tài liệu.
- Không được bịa thông tin.
- Câu hỏi phải rõ ràng.
- Câu trả lời ngắn gọn nhưng đầy đủ.
- Bao phủ những kiến thức quan trọng.
- Phân loại difficulty thành:
  "easy", "medium", hoặc "hard".

Chỉ trả về JSON array.

Format bắt buộc:

[
  {
    "question": "...",
    "answer": "...",
    "difficulty": "easy"
  }
]

Nội dung tài liệu:

${document.extractedText}
`;

    const generatedCards =
        await generateJSON(prompt);

    if (!Array.isArray(generatedCards)) {
        throw new AppError(
            "Invalid flashcard format from AI",
            500
        );
    }

    const flashcards = generatedCards.map(
        (card) => ({
            userId,
            subjectId: document.subjectId,
            documentId: document._id,

            question: card.question,
            answer: card.answer,

            difficulty:
                ["easy", "medium", "hard"].includes(
                    card.difficulty
                )
                    ? card.difficulty
                    : "medium",

            status: "new",
            reviewCount: 0,
        })
    );

    const savedFlashcards =
        await Flashcard.insertMany(
            flashcards
        );

    return savedFlashcards;
};