import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askAiAssistant = async (query: string, context?: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "خطا: کلید API یافت نشد.";

  try {
    const modelId = "gemini-2.5-flash";
    
    let prompt = `You are a helpful university software assistant for Persian speaking students. Answer in Persian (Farsi).
    The user is asking: ${query}`;
    
    if (context) {
      prompt += `\n\nContext about the current software page: ${context}`;
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are an expert IT administrator for a university. Be concise, helpful, and polite. Always answer in Persian.",
      }
    });

    return response.text || "متاسفانه پاسخی دریافت نشد.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "متاسفانه در برقراری ارتباط با هوش مصنوعی خطایی رخ داد.";
  }
};