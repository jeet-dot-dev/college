import {OpenAI} from 'openai' ;
import dotenv from "dotenv" ;

dotenv.config();
const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY!});

export async function getQuestionEmbedding(question:string):Promise<number[]> {
    const res = await openai.embeddings.create({
        model : "text-embedding-3-small",
        input : question
    });
    
   // console.log("embedded form" ,res.data )
    return res.data[0].embedding ;
}