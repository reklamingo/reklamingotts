
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
const bodyParser = require("body-parser");
const textToSpeech = require("@google-cloud/text-to-speech");
const cors = require("cors");

const client = new textToSpeech.TextToSpeechClient();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("client"));

const ipCounts = {};

app.post("/speak", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  ipCounts[ip] = (ipCounts[ip] || 0) + 1;

  if (ipCounts[ip] > 2) {
    return res.status(429).json({
      error: true,
      message: "Lütfen seslendirme hizmeti ürünümüze göz atın: https://www.reklamingo.com.tr/product-page/seslendirme-hizmeti"
    });
  }

  const { text, voice } = req.body;

  if (!voice || !voice.languageCode) {
    return res.status(400).json({
      error: true,
      message: "Ses verisi eksik. Lütfen geçerli bir ses seçin."
    });
  }

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
    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (error) {
    console.error("TTS API HATASI:", error);
    res.status(500).send("Seslendirme başarısız.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
