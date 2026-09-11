import Document from "../models/Document.js";
import { downloadFileAsBuffer } from "./cloudinary-download.service.js";
import { extractTextFromBuffer } from "./text-extractor.service.js";

export const processDocument = async (documentId) => {
  const document = await Document.findById(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  try {
    // Bắt đầu xử lý
    document.processingStatus = "processing";
    document.processingError = null;

    await document.save();

    // Download file từ Cloudinary
    const buffer = await downloadFileAsBuffer(
      document.secureUrl
    );

    // Extract text
    const extractedText = await extractTextFromBuffer(
      buffer,
      document.mimeType
    );

    // Kiểm tra nội dung
    if (!extractedText) {
      throw new Error("Could not extract any text from document");
    }

    // Lưu text
    document.extractedText = extractedText;
    document.processingStatus = "completed";
    document.processingError = null;

    await document.save();

    return document;
  } catch (error) {
    document.processingStatus = "failed";
    document.processingError = error.message;

    await document.save();

    throw error;
  }
};