const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
const bodyParser = require("body-parser");
const textToSpeech = require("@google-cloud/text-to-speech");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const client = new textToSpeech.TextToSpeechClient();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("client"));

let db = {};
const dbPath = path.join(__dirname, "database.json");

// Basit veritabanı yükleme
function loadDB() {
    try {
        const data = fs.readFileSync(dbPath);
        db = JSON.parse(data);
    } catch {
        db = {};
    }
}
function saveDB() {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}
loadDB();

app.post("/register", (req, res) => {
    const { email, password } = req.body;
    if (db[email]) return res.status(400).json({ error: "Zaten kayıtlı." });
    db[email] = { password, credit: 250 };
    saveDB();
    res.json({ message: "Kayıt başarılı." });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = db[email];
    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Geçersiz giriş." });
    }
    res.json({ credit: user.credit });
});

app.post("/use-code", (req, res) => {
    const { email, code } = req.body;
    if (code === "REKLAMINGO10K") {
        db[email].credit += 10000;
        saveDB();
        return res.json({ message: "Kod başarıyla yüklendi." });
    }
    res.status(400).json({ error: "Kod geçersiz." });
});

app.post("/speak", async (req, res) => {
    const { email, text, voice } = req.body;
    const charCount = text.length;
    const user = db[email];
    if (!user || user.credit < charCount) {
        return res.status(403).json({ error: "Yetersiz kredi." });
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
        user.credit -= charCount;
        saveDB();
        res.set("Content-Type", "audio/mpeg");
        res.send(response.audioContent);
    } catch (err) {
        res.status(500).json({ error: "TTS başarısız.", detail: err });
    }
});

app.listen(PORT, () => {
    console.log("Sunucu çalışıyor:", PORT);
});
