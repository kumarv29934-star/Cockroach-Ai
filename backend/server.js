require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ================= HOME =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Cockroach AI Backend",
    version: "4.0.0",
    status: "Running",
  });
});

// ================= CHAT =================

app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        reply: "Message is required.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    res.json({
      success: true,
      reply: response.text,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      reply: error.message,
    });

  }
});

// ================= IMAGE =================

app.post("/generate-image", async (req, res) => {

  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required."
      });
    }

    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt + "?width=720&height=1280&model=flux");

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer"
    });

    const base64 = Buffer.from(response.data).toString("base64");

    res.json({
      success: true,
      images: [
        `data:image/png;base64,${base64}`
      ]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Image generation failed."
    });

  }

});

// ================= SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Cockroach AI Backend Running on Port ${PORT}`);
});
