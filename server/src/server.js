const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const app = require("./app");

const { MONGODB_URI, PORT = 4000 } = process.env;

(async () => {
  try {
    if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env");

    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log("MongoDB connected");

    app.listen(PORT, () => console.log(`API on :${PORT}`));
  } catch (err) {
    console.error("Startup failure:", err.message);
    process.exit(1);
  }
})();
