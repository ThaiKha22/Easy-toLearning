import { GoogleGenAI } from "@google/genai";
import env from "../config/env.js";

const ai = new GoogleGenAI({
  apiKey: env.geminiApiKey,
});

export const generateText = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
};

export const generateJSON = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text;

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      "Gemini returned invalid JSON"
    );
  }
};