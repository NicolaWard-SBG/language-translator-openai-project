require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/translate", async (req, res) => {
  const { text, language } = req.body;

  if (!text || !language) {
    return res.status(400).json({ error: "Text and language are required" });
  }

  try {
    const messages = [
      { role: "system", content: "You are a helpful language translator." },
      {
        role: "user",
        content: `Translate the following text into ${language}: "${text}"`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const translated = response.choices[0].message.content;
    res.json({ translated });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
