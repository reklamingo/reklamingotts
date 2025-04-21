
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
const bodyParser = require("body-parser");
const textToSpeech = require("@google-cloud/text-to-speech");
const cors = require("cors");

const client = new textToSpeech.TextToSpeechClient();
app.use(cors());
app.use(bodyParser.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "..")));

const ipCounts = {};

app.post("/speak", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  ipCounts[ip] = (ipCounts[ip] || 0) + 1;

  if (ipCounts[ip] > 100) {
    return res.status(429).json({
      error: true,
      message: "Lütfen seslendirme hizmeti ürünümüze göz atın: https://www.reklamingo.com.tr/product-page/seslendirme-hizmeti"
    });
  }

  const { text, voice } = req.body;

  const request = {
    input: { text },
    voice: {
      languageCode: voice.languageCode,
      name: voice.name,
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set("Content-Type", "audio/mp3");
    res.send(response.audioContent);
  } catch (error) {
    console.error("TTS API HATASI:", error);
    res.status(500).send("TTS API HATASI");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
