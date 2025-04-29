const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

// Mock kullanıcı veritabanı
const users = [
  { id: 1, email: 'test@reklamingo.com', password: '$2a$10$KX9z1uJ2vXz7y5q8w3e4r.uT6vY9xW2mZ3nQ5p8r9t0uV1wX2yA' }
];

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
  }

  const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Kullanıcı bilgisi endpoint
app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret_key');
    const user = users.find(u => u.id === decoded.id);
    res.json({ email: user.email });
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
