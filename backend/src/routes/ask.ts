import express from "express";
import { getQuestionEmbedding } from "../querry/queryEmbedding";
import { getTopMatches } from "../querry/queryPinecone";
import { askAIWithContext } from "../querry/askAIWithContext";
import { twiml } from "twilio";

function extractNumberFromSpeech(text: string): number | null {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

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

// 1 .When someone calls your number, Twilio sends a POST request to this URL. Your server must respond with TwiML XML instructions.
router.post("/voice", (req, res) => {
  try {
    console.log("hi")
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say("welcome to BB college student help line .");
    voiceResponse
      .gather({
        input: ["speech"],
        timeout: 5,
        numDigits: 1,
        action: "call/roll", // where Twilio will send next
        method: "POST",
      })
      .say("Please say your roll number after the beep.");
    res.type("text/xml");
    res.send(voiceResponse.toString());
  } catch (error) {
    console.log(error);
  }
});

//2. Handle Roll Number & Ask for Question
router.post("/call/roll", async (req, res) => {
  try {
    const speechText = req.body.peechResult || "";
    console.log("speechtext", speechText);
    const rollNo = extractNumberFromSpeech(speechText);

    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say(
      `Thanks. Roll number ${rollNo}. What would you like to ask?`
    );

    voiceResponse.gather({
      input: ["speech"],
      timeout: 5,
      action: `call/ask?roll_no=${rollNo}`,
      method: "POST",
    });

    res.type("text/xml");
    res.send(voiceResponse.toString());
  } catch (error) {
    console.log(error);
  }
});

router.post('/call/ask',async (req,res)=>{
  try {
        const question = req.body.SpeechResult || '';
    const roll_no = parseInt(req.query.roll_no as string);

     const queryEmbedding = await getQuestionEmbedding(question);
     const matches = await getTopMatches(queryEmbedding, 3, roll_no);
      const answer = await askAIWithContext(question, matches); // your RAG call
     
     const voiceResponse = new twiml.VoiceResponse();
     voiceResponse.say(answer);
     res.type('text/xml');
    res.send(voiceResponse.toString());
  } catch (error) {
     console.log(error)
  }
})

export default router;
