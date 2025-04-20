require("dotenv").config();
const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

app.post("/api/speak", async (req, res) => {
  const { text, voice } = req.body;

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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
