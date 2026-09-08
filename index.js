
import OpenAI from "openai";
import dotenv from "dotenv";
import{createReadStream, writeFileSync} from'fs';
dotenv.config();


const client = new OpenAI({
    apiKey: process.env.openai_key,
     baseURL: "https://api.groq.com/openai/v1" //this will send the request to groq api instead of openai api
})

async function main(){
  
    const response = await client.audio.transcriptions.create({
       // model : "openai/gpt-oss-20b",
       model: "whisper-large-v3-turbo",
      file:createReadStream("./freesound_community-frase-91641.mp3"),
      language: "en",
    })
    console.log(response.text);
    const audio=response.text;
    writeFileSync("audio.txt",audio,"utf-8");//utf-8 is format.
    //this will create a text file with the transcribed text from the audio file.
    
}

main();