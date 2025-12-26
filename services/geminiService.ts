import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RAW_ITINERARY_TEXT } from "../constants";
import { TripData } from "../types";

// Define the schema for structured output
const tripSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    itinerary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "Date string e.g., 3/26" },
          weatherInfo: { type: Type.STRING, description: "Predicted weather for this day in Phu Quoc (March)" },
          events: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['transport', 'attraction', 'food', 'accommodation', 'other'] },
                time: { type: Type.STRING },
                title: { type: Type.STRING },
                location: { type: Type.STRING, description: "Specific location name for Google Maps search" },
                description: { type: Type.STRING },
                guideTips: { type: Type.STRING, description: "AI generated interesting story, history, or specific food recommendation for this spot." },
                highlightTags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tags like 'Must Eat', 'Reservation Required', 'Must Buy'" },
                cost: { type: Type.STRING }
              },
              required: ["id", "type", "title", "location"]
            }
          }
        },
        required: ["date", "weatherInfo", "events"]
      }
    },
    flights: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          route: { type: Type.STRING },
          time: { type: Type.STRING },
          number: { type: Type.STRING }
        }
      }
    },
    hotels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          address: { type: Type.STRING },
          dates: { type: Type.STRING },
          note: { type: Type.STRING },
          nearbyPlaces: {
            type: Type.ARRAY,
            description: "List of 3-4 recommended places near the hotel (food, massage, coffee)",
            items: {
               type: Type.OBJECT,
               properties: {
                 name: { type: Type.STRING },
                 type: { type: Type.STRING, enum: ['food', 'massage', 'coffee'] },
                 note: { type: Type.STRING }
               }
            }
          }
        }
      }
    },
    budget: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          description: { type: Type.STRING },
          amount: { type: Type.NUMBER },
          currency: { type: Type.STRING }
        }
      }
    },
    shoppingList: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          checked: { type: Type.BOOLEAN },
          note: { type: Type.STRING }
        },
        required: ["id", "name", "checked"]
      }
    },
    emergencyContacts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          number: { type: Type.STRING }
        }
      }
    }
  },
  required: ["itinerary", "flights", "hotels", "budget", "shoppingList", "emergencyContacts"]
};

export const parseItineraryWithGemini = async (providedKey?: string): Promise<TripData | null> => {
  // Use provided key or try to access process.env safely.
  // In Vite, use import.meta.env.VITE_API_KEY if defined, otherwise fall back.
  
  let apiKey = providedKey;
  
  if (!apiKey) {
      // Cast import.meta to any to avoid TS error about 'env' property
      const meta = import.meta as any;
      if (typeof meta !== 'undefined' && meta.env && meta.env.VITE_API_KEY) {
          apiKey = meta.env.VITE_API_KEY;
      } else {
          // Access process via globalThis to avoid TypeScript error TS2580: Cannot find name 'process'
          // This allows the build to pass even if @types/node is not installed.
          const globalProcess = (globalThis as any).process;
          if (globalProcess && globalProcess.env && globalProcess.env.API_KEY) {
              apiKey = globalProcess.env.API_KEY;
          }
      }
  }
  
  if (!apiKey) {
    console.warn("No API Key found");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Analyze the following travel itinerary for Phu Quoc, Vietnam. 
        Transform it into a structured JSON suitable for a travel app.
        
        CRITICAL INSTRUCTIONS:
        1. **Enrich Content**: For each "Attraction" or "Food" spot, generate a short 'guideTips' (1-2 sentences) about the place's history, best photo spot, or signature dish.
        2. **Tags**: Identify 'Must Eat', 'Must Buy', 'Reservation Required' items and put them in 'highlightTags'.
        3. **Weather**: Predict the typical weather for late March in Phu Quoc (Dry season, hot) for the 'weatherInfo'.
        4. **Shopping**: Extract items mentioned to buy (e.g., Mangosteen, Avocado smoothie) into the shopping list.
        5. **Emergency**: Add standard Vietnam emergency numbers (113, 115) to the emergencyContacts list.
        6. **Nearby Recommendations**: For each hotel, analyze its location (e.g., Grand World, Duong Dong) and suggest 3-4 specific real world places nearby for 'nearbyPlaces' field (Food, Massage, Coffee).
        7. **Language**: The output MUST be in Traditional Chinese (Taiwan).
        
        Input Text:
        ${RAW_ITINERARY_TEXT}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: tripSchema,
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as TripData;
    }
    return null;

  } catch (error) {
    console.error("Gemini parsing error:", error);
    return null;
  }
};