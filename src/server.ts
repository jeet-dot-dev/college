import { embadedText } from "./utils/openai";
import { getFormattedStudentRoutines } from "./utils/raw";
import { saveEmbeddingToPinecones } from "./vector/db";

async function main() {
  const rows = await getFormattedStudentRoutines();

  for (const row of rows) {
    const vector = await embadedText(row.rawText);
    const metadata = {
      roll_no: row.roll_no,
    };
    await saveEmbeddingToPinecones(
      JSON.stringify(row.roll_no),
      vector,
      metadata
    );
  }

  console.log("Embedding done.");
}

main();
