import express from "express";
import cors from "cors";
import morgan from "morgan";
//import { ClerkExpressWithAuth } from "@clerk/express";   // ← works on latest

import clientRoutes from "./routes/client.routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

// Attach Clerk: sets req.auth if a valid Bearer token is present
//app.use(ClerkExpressWithAuth());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/clients", clientRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
