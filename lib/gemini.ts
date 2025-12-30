
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeGrowth(
  skillName: string,
  pastContent: string,
  currentContent: string,
  messageToFuture: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an encouraging educational psychologist and mentor. Your task is to compare two skill recordings (past and present) by the same student to celebrate their growth.

Skill Track: ${skillName}
---
PAST RECORDING (Locked previously):
"${pastContent}"

MESSAGE PAST STUDENT SENT TO FUTURE SELF:
"${messageToFuture}"

PRESENT RECORDING (Today's achievement):
"${currentContent}"
---

Analyze the improvement using these specific dimensions:
1. Clarity of Explanation: How much clearer are they now?
2. Confidence: Do they sound more self-assured and bold?
3. Vocabulary Usage: What new terms or concepts are they using correctly?
4. Speed and Structure: Is their thinking more organized or faster?
5. Concept Understanding: How has their mental model of ${skillName} deepened?

STRICT GUIDELINES:
- Use positive, motivational language.
- Provide specific examples of improvements found in the text.
- Maintain a student-friendly tone (ages 11-18).
- DO NOT use negative judgment or criticism.
- DO NOT use marks, grades, or percentages.

OUTPUT FORMAT:
- A short, inspiring "Growth Summary" (2-3 sentences).
- A section titled "Your Evolution" with bullet points for the 5 dimensions above.
- A final encouraging closing thought reflecting on their message to their future self.`,
      config: {
        temperature: 0.8,
      },
    });

    return response.text || "Your Growth Mirror is foggy right now. Take a look at your past work and see how far you've come—you're doing great!";
  } catch (error) {
    console.error("Growth Mirror Error:", error);
    return "The Growth Mirror is taking a break. Don't worry, your progress is still safely sealed in the vault!";
  }
}
