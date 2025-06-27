import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
    apiKey : process.env.PINECONE_API_KEY || "" ,
});
const index = pinecone.index("student-routine");

export async function getTopMatches(queryEmbedding:number[],topK = 3 , roll_no?: number) {
   try {
      const result = await index.query({
        vector : queryEmbedding ,
        topK,
        includeMetadata : true ,
        filter : roll_no ? {roll_no : {$eq : roll_no}} : undefined
    }) ;
    console.log(result);
    return result.matches || [] ;
   } catch (error) {
    console.log(error);
    return [] ;
   }
}