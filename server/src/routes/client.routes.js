import { Router } from "express";
import Client from "../models/Client.js";
//import { ClerkExpressRequireAuth } from "@clerk/express";  // ← protect routes

const router = Router();

// Require a signed-in user for everything under /api/clients
//router.use(ClerkExpressRequireAuth());

// Create
router.post("/", async (req, res, next) => {
  try {
    const ownerId = req.auth.userId;
    const { firstName, lastName, email, phone, goals, notes } = req.body;
    const created = await Client.create({ firstName, lastName, email, phone, goals, notes, ownerId });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// List
router.get("/", async (req, res, next) => {
  try {
    const ownerId = req.auth.userId;
    const items = await Client.find({ ownerId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { next(err); }
});

// Read by id
router.get("/:id", async (req, res, next) => {
  try {
    const ownerId = req.auth.userId;
    const item = await Client.findOne({ _id: req.params.id, ownerId });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) { next(err); }
});

// Update
router.put("/:id", async (req, res, next) => {
  try {
    const ownerId = req.auth.userId;
    const updated = await Client.findOneAndUpdate(
      { _id: req.params.id, ownerId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) { next(err); }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  try {
    const ownerId = req.auth.userId;
    const deleted = await Client.findOneAndDelete({ _id: req.params.id, ownerId });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
