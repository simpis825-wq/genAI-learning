import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();
const googleGenAI = new GoogleGenAI({
  apiKey: process.env.gemini_key,
});

app.get("/",async (req,res)=>{

 
  const response = await googleGenAI.models.generateContentStream({
    model: "gemini-3.6-flash",
    contents:"Tell me about AI in detail",
    
  })
 // console.log(response.text);
 for await (const chunk of response) {
     const text = chunk.text;
    //  console.log(text);
    if(text){
      res.write(text); //because not every streamed chunk is guaranteed to contain text.
    }
 }

 res.end("___Content done___")

})

app.listen(3200);

