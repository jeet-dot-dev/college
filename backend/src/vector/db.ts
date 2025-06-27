import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv" ;

dotenv.config();

const pinecone = new Pinecone({
    apiKey : process.env.PINECONE_API_KEY || "" ,
})



const index = pinecone.Index("student-routine");

export async function saveEmbeddingToPinecones(
    id : string ,
    vector : number[],
    metadata : Record<string , any>
) {
    await index.upsert([
        {
            id ,
            values : vector ,
            metadata ,
        }
    ])
}