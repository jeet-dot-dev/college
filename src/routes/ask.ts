import express from "express";
import { getQuestionEmbedding } from "../querry/queryEmbedding";
import { getTopMatches } from "../querry/queryPinecone";
import { askAIWithContext } from "../querry/askAIWithContext";

const router = express.Router();

router.post("/ask", async (req, res): Promise<any> => {
  const { question, roll_no } = req.body;
  if (!question || !roll_no)
    return res.status(400).json({ error: "Missing question or roll_no" });
  try {
    const embedding = await getQuestionEmbedding(question);
    const matches = await getTopMatches(embedding, 3, roll_no);
    if (matches.length === 0) {
      return res.status(404).json({ error: "No relevant data found" });
    }
    const ans = await askAIWithContext(question, matches);
    res.json({ ans });
  } catch (error) {
    console.log(error);
  }
});

export default router;
