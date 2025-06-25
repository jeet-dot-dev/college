import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
    apiKey : process.env.VECTOR_API || "" ,
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