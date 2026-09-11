import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    return {
      folder: "ai-studyhub/documents",

      resource_type: "raw",

      public_id: `${Date.now()}-${file.originalname
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "_")}`,

      format: file.originalname
        .split(".")
        .pop()
        .toLowerCase(),
    };
  },
});

const allowedMimeTypes = [
  "application/pdf",

  "text/plain",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/msword",
];

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Only PDF, DOC, DOCX and TXT files are allowed"
      )
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

export default upload;