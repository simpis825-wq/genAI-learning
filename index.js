
import OpenAI from "openai";
import dotenv from "dotenv";
//import { encoding_for_model } from "tiktoken";
dotenv.config();
//**IMPORTANT  
//"Use the same OpenAI-style API format, but send the request to Groq instead. 
//BCS we dont have credits for openAI

const prompt = "what is coding";
const model =  "openai/gpt-oss-20b";

const client = new OpenAI({
    apiKey: process.env.openai_key,
     baseURL: "https://api.groq.com/openai/v1" //this will send the request to groq api instead of openai api
})
// const response = await client.responses.create({
//     instructions: "give result in one word",
//     input:"apple colour is",
//     model: "gpt-4o-mini"
// });
//console.log(response);
const response = await client.responses.create({
    
    input:[
    //     {  role:"system",content:"answer in hindi" },
    // { role:"developer", content:"give example"},
    {  role:"user",content:prompt}],
    model: model,
    //temperature:0,
    max_output_tokens:100, //this is the max tokens that can be used in output
    store: false, //this is to store the response in groq database
});
 console.log(response);
//console.log(response.output_text);
//console.log(response.usage);


//*****This tiktoken package we can use with openai not with groq 
//caclculate the tokens 
// function calculateToken(){
// const encoder = encoding_for_model(model);
// const tokens = encoder.encode(prompt);
// console.log(tokens);//it will give the tokens used in prompt + default 7 tokens because of system and developer role
// }
// calculateToken();


