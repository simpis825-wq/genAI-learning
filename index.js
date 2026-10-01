import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

//***********This code is not working with openAi api because of billing  ************ */
// Step 1 check which model (OpenAI or Gemini) you are using 
//Step 2 check if you are using openAi with Groq
//step 3 check if key is same as model in .env file
const client = new OpenAI({
    apiKey: process.env.openai_key,
})

async function main(){

const response = await client.embeddings.create({
  model:"text-embedding-3-small",
  input:"world"
})
console.log(response.data[0].embedding);
}

main();
 
