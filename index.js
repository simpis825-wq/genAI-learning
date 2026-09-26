import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.gemini_key,
});

async function main(){
  const response = await googleGenAI.models.generateContent({
    model: "gemini-3.6-flash",
    contents:"What is the religion?",
    config:{

      thinkingConfig:{
        includeThoughts:true,
        thinkingBudget:100
      },
      temperature:2
     // systemInstruction:"give a simple answer in 30 words"
    }
  })
  console.log(response.text);
}

main();