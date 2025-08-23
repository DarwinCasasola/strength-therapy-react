const Client = require("../models/Client");

// Create
async function create(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "email is required" });

    const doc = await Client.create(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

// List with optional q search (name/email/phone)
async function list(req, res, next) {
  try {
    const { q } = req.query;
    const filter = q
      ? { $or: [
          { name:   { $regex: q, $options: "i" } },
          { email:  { $regex: q, $options: "i" } },
          { phone:  { $regex: q, $options: "i" } },
        ] }
      : {};
    const items = await Client.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch (err) { next(err); }
}

// Read one
async function get(req, res, next) {
  try {
    const doc = await Client.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) { next(err); }
}

// Update (partial)
async function update(req, res, next) {
  try {
    const doc = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) { next(err); }
}

// Delete
async function remove(req, res, next) {
  try {
    const doc = await Client.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = { create, list, get, update, remove };
