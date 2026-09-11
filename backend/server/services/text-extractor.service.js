import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const normalizeText = (text) => {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
};

export const extractTextFromBuffer = async (buffer, mimeType) => {
  if (mimeType === "application/pdf") {
    const parser = new PDFParse({
      data: buffer,
    });

    try {
      const result = await parser.getText();

      return normalizeText(result.text);
    } finally {
      await parser.destroy();
    }
  }

  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return normalizeText(result.value);
  }

  if (mimeType === "text/plain") {
    return normalizeText(buffer.toString("utf-8"));
  }

  throw new Error(`Unsupported file type: ${mimeType}`);
};
