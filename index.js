
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.openai_key,
     baseURL: "https://api.groq.com/openai/v1" //this will send the request to groq api instead of openai api
})
async function aiAnswer(qsn){
    const response = await client.responses.create({
        model : "openai/gpt-oss-20b",
        input:qsn
    })
     console.log(response.output_text);
}
//aiAnswer();
//chat with terminal 
process.stdout.write("Ask me anything: ")
process.stdin.on("data",(data)=>{
  const qsn = data.toString().trim();
  if(qsn=="exit||Exit"){
    process.exit();
  }else{
    aiAnswer(qsn);
  }
});