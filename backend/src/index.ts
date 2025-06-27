import express from "express";
import dotenv from "dotenv" ;
import cors from "cors" ;
import router from "./routes/ask";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api/v1',router);

app.listen(process.env.PORT,()=>{
    console.log("listing");
})