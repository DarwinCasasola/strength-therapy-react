import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT ?? 4000;

async function start() {
  try {
    if (!process.env.MONGODB_URI) throw new Error('Missing MONGODB_URI in .env');
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`API on :${PORT}`));
  } catch (err) {
    console.error('Startup failure:', err.message || err);
    process.exit(1);
  }
}
start();
