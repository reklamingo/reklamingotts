
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

// Sahte kullanıcı verisi
let users = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client'));

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Bu e-posta zaten kayıtlı.' });
    }
    users.push({ email, password, credits: 250 });
    res.json({ success: true, message: 'Kayıt başarılı. 250 karakter krediniz tanımlandı.' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(400).json({ error: 'Geçersiz e-posta veya şifre.' });
    }
    res.json({ success: true, user });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
