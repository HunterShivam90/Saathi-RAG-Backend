import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import { Pinecone } from "@pinecone-database/pinecone";

import { PineconeStore } from "@langchain/pinecone";

async function indexing() {
  // pdf file ko load kariye apne system ke andar

  const PDF_PATH = "";
  const pdfLoader = new PDFLoader(PDF_PATH);
  const rawDocs = await pdfLoader.load();

  console.log(rawDocs);

  console.log(rawDocs.length);

  // chunking create karna next kaam

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunkedDocs = await textSplitter.splitDocuments(rawDocs);

  console.log(chunkedDocs);

  console.log(chunkedDocs.length);

  // Embedding create karni hai abbb

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "text-embedding-004",
  });

  const pinecone = new Pinecone();

  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  // sinle step ke andar embedding create karenge aur usko vector db ke andar daal denge

  await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  // vector database ke andar daal do
}

indexing();
