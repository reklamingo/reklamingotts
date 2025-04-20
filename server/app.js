
const express = require('express');
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

const client = new textToSpeech.TextToSpeechClient();

app.post('/speak', async (req, res) => {
  const { text, voice } = req.body;

  const request = {
    input: { text },
    voice: { languageCode: voice.split('-').slice(0, 2).join('-'), name: voice },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.send({ audioContent: response.audioContent.toString('base64') });
  } catch (error) {
    console.error('TTS API HATASI:', error);
    res.status(500).send({ error: 'Ses üretilemedi.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
