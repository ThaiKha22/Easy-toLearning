import Document from "../models/Document.js";
import Quiz from "../models/Quiz.js";
import QuizQuestion from "../models/Quiz-question.js";

import AppError from "../utils/AppError.js";

import { generateJSON } from "./gemini.service.js";

export const generateQuiz = async (
    userId,
    documentId,
    numberOfQuestions = 10
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

Dựa ONLY trên nội dung tài liệu dưới đây,
hãy tạo ${numberOfQuestions} câu hỏi trắc nghiệm
để kiểm tra kiến thức của sinh viên.

Yêu cầu:

- Viết bằng tiếng Việt.
- Chỉ sử dụng thông tin có trong tài liệu.
- Không bịa thông tin.
- Mỗi câu có đúng 4 lựa chọn.
- Chỉ có 1 đáp án đúng.
- correctAnswer phải là index từ 0 đến 3.
- explanation giải thích ngắn gọn tại sao đáp án đó đúng.
- difficulty chỉ được là:
  "easy", "medium", hoặc "hard".
- Câu hỏi phải bao phủ các kiến thức quan trọng.
- Không tạo các câu hỏi trùng nhau.

Chỉ trả về JSON theo format:

{
  "title": "...",
  "description": "...",
  "difficulty": "mixed",
  "questions": [
    {
      "question": "...",
      "options": [
        "...",
        "...",
        "...",
        "..."
      ],
      "correctAnswer": 0,
      "explanation": "...",
      "difficulty": "easy"
    }
  ]
}

Nội dung tài liệu:

${document.extractedText}
`;

    const result = await generateJSON(prompt);

    if (
        !result ||
        !Array.isArray(result.questions)
    ) {
        throw new AppError(
            "Invalid quiz format from AI",
            500
        );
    }

    if (
        result.questions.length === 0
    ) {
        throw new AppError(
            "AI generated no questions",
            500
        );
    }

    // Validate từng question trước khi lưu
    for (const question of result.questions) {
        if (
            typeof question.question !== "string" ||
            !Array.isArray(question.options) ||
            question.options.length !== 4 ||
            !Number.isInteger(question.correctAnswer) ||
            question.correctAnswer < 0 ||
            question.correctAnswer > 3
        ) {
            throw new AppError(
                "AI generated invalid question format",
                500
            );
        }
    }

    // Tạo Quiz
    const quiz = await Quiz.create({
        userId,
        subjectId: document.subjectId,
        documentId: document._id,

        title:
            result.title ||
            `Quiz - ${document.title}`,

        description:
            result.description || "",

        totalQuestions:
            result.questions.length,

        difficulty:
            ["easy", "medium", "hard", "mixed"].includes(
                result.difficulty
            )
                ? result.difficulty
                : "mixed",

        status: "ready",
    });

    // Tạo Questions
    const questions =
        await QuizQuestion.insertMany(
            result.questions.map((question) => ({
                quizId: quiz._id,

                question: question.question,

                options: question.options,

                correctAnswer:
                    question.correctAnswer,

                explanation:
                    question.explanation || "",

                difficulty:
                    ["easy", "medium", "hard"].includes(
                        question.difficulty
                    )
                        ? question.difficulty
                        : "medium",
            }))
        );

    return {
        quiz,
        questions,
    };
};