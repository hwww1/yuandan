import { GoogleGenAI, Type } from "@google/genai";

// Fallback data
const FALLBACK_GREETING = "去爱，去生活，\n去受伤，去治愈。\n2025，\n做自己的光。";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1516075677024-e7c62bf654f5?q=80&w=1000&auto=format&fit=crop";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateNewYearGreeting = async (): Promise<string> => {
  if (!process.env.API_KEY) return FALLBACK_GREETING;

  try {
    // Prompt engineered for Gen Z / Modern aesthetic style
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, aesthetic, and "Gen Z" style New Year greeting for 2025. 
      Rules:
      1. No traditional clichés like "Gong Xi Fa Cai" or "Happy New Year".
      2. Focus on: self-care, chill vibes, romance, freedom, or becoming a better self.
      3. Style: Poetic, minimal, slightly melancholic but hopeful, or cool/witty.
      4. Length: 3-5 short lines max.
      5. Language: Chinese.
      6. Return ONLY the text without title or explanation.`,
      config: {
        temperature: 1.1, // Higher creativity
      }
    });
    return response.text?.trim() || FALLBACK_GREETING;
  } catch (error) {
    console.error("Error generating text:", error);
    return FALLBACK_GREETING;
  }
};

export const generateFestiveImage = async (): Promise<string> => {
  if (!process.env.API_KEY) return FALLBACK_IMAGE;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: 'A dreamy, ethereal, aesthetic abstract background for New Year 2025. Soft lighting, bokeh, gradient of red, pink, and gold. High fashion style, minimal, cinematic lighting. Vertical aspect ratio, 9:16.',
      config: {
         // Using generateContent to get image parts
      }
    });
    
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return FALLBACK_IMAGE;

  } catch (error) {
    console.error("Error generating image:", error);
    return FALLBACK_IMAGE;
  }
};