import Document from "../models/Document.js";
import AppError from "../utils/AppError.js";
import { generateText } from "./gemini.service.js";

export const generateDocumentSummary = async (
    userId,
    documentId
) => {
    const document = await Document.findOne({
        _id: documentId,
        userId,
    });

    if (!document) {
        throw new AppError("Document not found", 404);
    }

    if (document.summary) {
        return {
            documentId: document._id,
            title: document.title,
            summary: document.summary,
        };
    }

    if (!document.extractedText) {
        throw new AppError(
            "Document has no extracted text",
            400
        );
    }

    const prompt = `
Bạn là trợ lý học tập AI.

Hãy đọc nội dung tài liệu dưới đây và tạo một bản tóm tắt
phù hợp cho sinh viên.

Yêu cầu:
- Viết bằng tiếng Việt.
- Giải thích các ý chính rõ ràng.
- Không bịa thêm thông tin không có trong tài liệu.
- Chia thành các phần có tiêu đề.
- Làm nổi bật các khái niệm quan trọng.
- Cuối cùng đưa ra 5 ý chính cần ghi nhớ.

Nội dung tài liệu:

${document.extractedText}
`;

    const summary = await generateText(prompt);
    document.summary = summary;
    await document.save();

    return {
        documentId: document._id,
        title: document.title,
        summary,
    };
};