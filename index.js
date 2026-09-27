import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {readFileSync} from "fs";
dotenv.config();

const googleGenAI = new GoogleGenAI({
  apiKey: process.env.gemini_key,
});

async function main(){
 
  const base64= readFileSync("./Image/WhatsApp Image 2025-05-13 at 23.27.52.jpeg",{
    encoding: "base64"
  });
 
  const response = await googleGenAI.models.generateContent({
    model: "gemini-3.6-flash",
    contents:[{
      inlineData:{
        mimeType: "image/jpeg",
        data: base64
      },
    },
    //we can give the prompts of whatever we want
   // {text:"read text from this image"}
     {text:"give me the color combination of this image "}
  ],
  })
  console.log(response.text);
}
main();
 
