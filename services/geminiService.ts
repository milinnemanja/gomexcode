
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async findLikelyProduct(query: string, availableProducts: Product[]): Promise<string | null> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Korisnik traži PLU kod za proizvod u supermarketu. 
        Dostupni proizvodi: ${availableProducts.map(p => `${p.name} (Kod: ${p.code})`).join(', ')}.
        Upit korisnika: "${query}"
        
        Ako se upit poklapa ili je veoma sličan dostupnom proizvodu (čak i ako je na srpskom sa drugacijim padežima), vrati SAMO ID proizvoda.
        Ako nema direktnog poklapanja, pokušaj da predložiš šta bi korisnik mogao tražiti sa liste.
        Ako ništa nije pronađeno, odgovori sa "NONE".`,
        config: {
          temperature: 0.1,
          responseMimeType: "text/plain"
        }
      });

      const result = response.text?.trim();
      return result === 'NONE' ? null : result;
    } catch (error) {
      console.error("AI Greška:", error);
      return null;
    }
  }
};
