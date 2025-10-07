
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an expert Python programmer and problem-solving assistant. Your goal is to provide clear, concise, and accurate solutions to Python-related questions.

Follow these rules:
1.  When providing code, wrap it in a Markdown code block with the language identifier \`\`\`python.
2.  Explain the code you provide. Describe what each part of the code does and why it's a good solution.
3.  If the user's question is ambiguous, ask for clarification.
4.  If the solution involves trade-offs (e.g., performance vs. readability), mention them.
5.  Keep your tone helpful, professional, and encouraging.
6.  Structure your response for readability using paragraphs, lists, and code blocks.
`;

export const solvePythonProblem = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while processing your request.");
  }
};
