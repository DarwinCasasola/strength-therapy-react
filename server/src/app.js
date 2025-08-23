const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const clientRoutes = require("./routes/client.routes");

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] })); // Vite dev
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, service: "Strength Therapy API" }));

app.use("/api/clients", clientRoutes);

// Basic error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
