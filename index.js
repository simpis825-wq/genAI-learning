
import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import path from "path";
import { createReadStream, writeFileSync } from "fs";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true })); // this is the middleware to help the post request

const client = new OpenAI({
    apiKey: process.env.openai_key,
     baseURL: "https://api.groq.com/openai/v1" //this will send the request to groq api instead of openai api
})

//Route
app.get("/", (req, res) => {
    res.send(`<form action="/audio" method="post">
      <input type="text" name="inputData"/> 
      <br/>
      <br/>
      <button>Convert text in Audio</button>
      
      </form>`);
});

app.post("/audio",async (req,res)=>{
  
  await main(req,res);
})
async function main(req,res){
  const response = await client.audio.speech.create({
    model:"canopylabs/orpheus-v1-english",
    input:req?.body?.inputData,
    voice:"troy",
    response_format: "wav",
  });
  const baseResponse = Buffer.from(await response.arrayBuffer());
  writeFileSync("audio.mp3",baseResponse);
  console.log(baseResponse);
   res.send("Text Converted to Audio");
  
}

//main();
app.listen(3200);
