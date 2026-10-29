import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

async function indexing(){

    // pdf file ko load kariye apne system ke andar

    

   const PDF_PATH = '';
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

   // vector database ke andar daal do



    

}

indexing();