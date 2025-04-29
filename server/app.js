
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

let users = {};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("client"));

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!users[email]) {
    users[email] = { password, credits: 250 };
    return res.json({ message: "Kayıt başarılı!" });
  } else {
    return res.json({ error: true, message: "Zaten kayıtlısınız." });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (users[email] && users[email].password === password) {
    return res.json({ message: "Giriş başarılı!" });
  } else {
    return res.json({ error: true, message: "Geçersiz e-posta veya şifre." });
  }
});

app.listen(PORT, () => console.log("Server running on port", PORT));
