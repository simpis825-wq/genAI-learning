//In this we have created embedding 
//one json file and as an output generated one json file 

import { InferenceClient } from "@huggingface/inference";
import { readFileSync, writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const client = new InferenceClient(process.env.hugging_key);

async function generateEmbedding(text) {
  const response = await client.featureExtraction({
    inputs: text,
    model: "sentence-transformers/all-MiniLM-L6-v2"
  });

  return response;
}

function createFileForEmbedding(data, filename) {
  writeFileSync(filename, JSON.stringify(data, null, 2));
}

async function main() {
  // Read data.json
  const data = readFileSync("data.json", "utf-8");

  // Convert JSON string to JavaScript object
  const jsonData = JSON.parse(data);

  const responseData = [];

  // Generate embedding for each item
  for (const item of jsonData.items) {
    const embedding = await generateEmbedding(item);

    responseData.push({
      item: item,
      embedding: embedding
    });
  }

  // Save item + embedding
  createFileForEmbedding(responseData, "embedding.json");

 
}

main();