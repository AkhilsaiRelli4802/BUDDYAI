// Use ES6 import instead of require
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const apiKey = "AIzaSyB3s_ayZ24uYkG6yoErnCSuOsT_48nbnOI"; // Replace with your actual API key

async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = await genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
      
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
}

export default runChat;
