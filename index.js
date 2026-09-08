
import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import path from "path";
import { createReadStream } from "fs";

dotenv.config();
const app = express();
app.get("/",(req,res)=>{
  res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
    <input type ="file" name ="audio"/>
    <button>Upload file</button>
    </form>`)
})


const client = new OpenAI({
    apiKey: process.env.openai_key,
     baseURL: "https://api.groq.com/openai/v1" //this will send the request to groq api instead of openai api
})

const storage = multer.diskStorage({
  destination:'uploads',
  filename:(req,file,cb)=>{
    const ext = path.extname(file.originalname);
    cb(null,file.fieldname+ext);
  }
})
//middleware to handle file upload
const upload = multer({storage});
app.post("/upload",upload.single("audio"),async (req,res)=>{

      const response = await client.audio.transcriptions.create({
       // model : "openai/gpt-oss-20b",
       model: "whisper-large-v3-turbo",
      file:createReadStream(req.file.path),
      language: "en",
    })
    const output = response.text;
   // console.log(response.text);
  res.send(`<h1>${output}</h1>`);
})

app.listen(3200);
