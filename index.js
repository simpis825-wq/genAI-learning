import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.gemini_key,
});

async function main(){
  const response = await googleGenAI.models.generateContentStream({
    model: "gemini-3.6-flash",
    contents:"Tell me about AI in detail",
    
  })
 // console.log(response.text);
 for await (const chunk of response) {
     const text = chunk.text;
     console.log(text);
 }
}

main();