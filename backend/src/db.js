const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri || typeof uri !== 'string') {
  console.error('❌ MONGODB_URI missing/invalid. Check backend/.env and dotenv load order.');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });