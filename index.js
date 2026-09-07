
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const context =[
  {
    role:'system',
    content:'keep answer short and simple'
  }
]
const client = new OpenAI({
    apiKey: process.env.openai_key,
     baseURL: "https://api.groq.com/openai/v1" //this will send the request to groq api instead of openai api
})
async function aiAnswer(qsn){
  context.push({role:'user',content:qsn})
    const response = await client.responses.create({
        model : "openai/gpt-oss-20b",
        input:context
    })
    context.push({role:'assistant',content:response.output_text})
    //this si to remember what we have asked and what the ai has answered so that it can answer in context
    console.log(context)
    //but this increases the token bcs it remembers the whole conversation so it will be better to keep the context small and simple
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