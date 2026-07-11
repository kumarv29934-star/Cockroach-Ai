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

// ================= TEST =================

app.get("/test", (req, res) => {
  res.json({
    api: process.env.DASHSCOPE_API_KEY ? "OK" : "Missing",
    workspace: process.env.QWEN_WORKSPACE_ID
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

  } catch (err) {
    console.log("FULL ERROR:");
    console.log(JSON.stringify(err.response?.data || err.message, null, 2));

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message
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

    const response = await axios.post(
      `https://${process.env.QWEN_WORKSPACE_ID}.ap-southeast-1.maas.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation`,
      {
        model: "qwen-image-2.0-pro",
        input: {
          messages: [
            {
              role: "user",
              content: [
                {
                  text: prompt
                }
              ]
            }
          ]
        },
        parameters: {
          size: "1024*1024",
          watermark: false,
          prompt_extend: true
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`
        }
      }
    );

    const image =
      response.data.output.choices[0].message.content[0].image;

    res.json({
      success: true,
      images: [image]
    });

  } catch (err) {
    console.log("FULL ERROR:");
    console.log(JSON.stringify(err.response?.data || err.message, null, 2));

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message
    });
  }
});

// ================= VIDEO =================
app.post("/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required."
      });
    }

    const response = await axios.post(
      "https://api.lumalabs.ai/dream-machine/v1/generations",
      {
        prompt: prompt,
        aspect_ratio: "9:16",
        loop: false
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      id: response.data.id,
      state: response.data.state,
      data: response.data
    });

  } catch (err) {
    console.error("LUMA ERROR:");
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message
    });
  }
});
// ================= SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Cockroach AI Backend Running on Port ${PORT}`);
});
