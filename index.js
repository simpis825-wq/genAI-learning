import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.gemini_key,
});

async function main(){
  const response = await googleGenAI.models.generateContent({
    model: "gemini-3.6-flash",
    contents:"What is the capital of France?",
  })
  console.log(response.text);
}

main();