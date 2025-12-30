import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client safely
const getAIClient = () => {
  // In Vite/Vercel, we access the key via process.env.API_KEY due to the vite.config.ts 'define' setting
  const apiKey = (process.env as any).API_KEY;
  
  if (!apiKey) {
    // We return null instead of throwing to avoid crashing the whole app if the key is just missing
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function analyzeGrowth(
  skillName: string,
  pastContent: string,
  currentContent: string,
  messageToFuture: string
): Promise<string> {
  const ai = getAIClient();
  
  if (!ai) {
    return "Growth Mirror Error: API_KEY is missing. Please add your Gemini API Key in Vercel project settings.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an encouraging educational psychologist and mentor. Compare these two skill recordings.

Skill Track: ${skillName}
---
PAST: "${pastContent}"
GOAL AT THAT TIME: "${messageToFuture}"
PRESENT: "${currentContent}"
---

Analyze the improvement in: Clarity, Confidence, Vocabulary, Structure, and Understanding.
Be positive, specific, and student-friendly. No marks or grades.`,
      config: {
        temperature: 0.8,
      },
    });

    return response.text || "Your Growth Mirror is foggy right now. Great job on completing your reflection!";
  } catch (error) {
    console.error("Growth Mirror Error:", error);
    return "The Growth Mirror is momentarily unavailable. Your progress is still saved!";
  }
}