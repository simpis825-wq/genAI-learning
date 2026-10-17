import {CloudClient} from "chromadb";
import dotenv from "dotenv";
dotenv.config();

const client = new CloudClient({
    apiKey:process.env.CHROMA_API_KEY,
    tenant:process.env.CHROMA_TENANT,
    database:process.env.CHROMA_DATABASE
})

async function main(){
   const collection= await client.getOrCreateCollection({
        name:"animal",
        
         embeddingFunction: null

    })
    await collection.add({
        ids:["2"],
        documents:["dog"],
        embeddings:[[1,2,-1]]
    })
}
main();