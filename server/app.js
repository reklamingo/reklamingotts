
const express = require('express');
const app = express();
const path = require('path');

// Public klasörünü (client ve diğer dosyalar) sunmak için
app.use(express.static(path.join(__dirname, '..')));

app.listen(10000, () => {
  console.log("Server running on port 10000");
});
