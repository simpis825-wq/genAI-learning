import { GoogleGenAI } from "@google/genai";
import { resolve } from "dns";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`<form action="/generate" method="post">
    <input type ="text" name="text" placeholder="Enter prompt" />
    <button>Click me</button>
  </form>`);
}
);
app.post('/generate', async (req, res) => {
  const prompt = req.body.text;
  await main(prompt);
  res.send("Video generated successfully!");
});

const googleGenAI = new GoogleGenAI({
  apiKey: process.env.gemini_key,
});

async function main(prompt){
 
  let operation = await googleGenAI.models.generateVideos({
    model: "veo-3.1-generate-preview",
   prompt: prompt,
   config:{
    numberOfImages: 1
   }
  })
 while(!operation.done){
console.log("please wait, video is getting ready")
await new Promise((resolve)=>setTimeout(resolve,1000));
operation=await GoogleAI.operation.getVideosOperation({
  operation:operation
})
 }

 GoogleAI.files.download({
  file:operation.response.generateVideo[0].video,
  downloadPath:"video.mp4"
 })
}
app.listen(3200);

 
