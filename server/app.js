
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const textToSpeech = require("@google-cloud/text-to-speech");
const util = require("util");
const app = express();
const client = new textToSpeech.TextToSpeechClient();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../"));

app.post("/speak", async (req, res) => {
  const { text, voice } = req.body;

  const request = {
    input: { text },
    voice: {
      languageCode: voice.startsWith("tr") ? "tr-TR" : "en-US",
      name: voice,
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set("Content-Type", "audio/mp3");
    res.send(response.audioContent);
  } catch (error) {
    console.error("TTS ERROR:", error);
    res.status(500).send("Ses oluşturulamadı.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
