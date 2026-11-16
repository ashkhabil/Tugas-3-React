require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS agar frontend React dapat berkomunikasi dengan API backend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware untuk mem-parsing body request dalam format JSON
app.use(express.json());

// Root endpoint sebagai penanda server berjalan
app.get('/', (req, res) => {
  res.json({ message: 'API Express & Prisma aktif. Gunakan endpoint /products.' });
});

// Menggunakan route untuk endpoint /products
app.use('/products', productRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
