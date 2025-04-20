require("dotenv").config();
const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");
const cors = require("cors");
const path = require("path");

const app = express();
const express = require('express');
const app = express();
const path = require('path');

// statik dosyaları root dizinden (index.html, styles.css, script.js vs.) sunmak için:
app.use(express.static(path.join(__dirname, '..')));

// varsa API route'ların buraya gelir
// örnek: app.post('/api/speak', (req, res) => { ... });

app.listen(10000, () => {
  console.log("Server running on port 10000");
});

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client")));

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

app.post("/api/speak", async (req, res) => {
  const { text, voice } = req.body;

  try {
    const request = {
      input: { text },
      voice: {
        languageCode: "tr-TR",
        ssmlGender: voice || "FEMALE",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);
    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (error) {
    console.error("TTS API HATASI:", error);
    res.status(500).send("Seslendirme yapılamadı.");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
