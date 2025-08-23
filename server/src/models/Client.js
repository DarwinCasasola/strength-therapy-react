const { Schema, model } = require("mongoose");

const ClientSchema = new Schema(
  {
    name:    { type: String, trim: true },
    email:   { type: String, trim: true, lowercase: true, required: true },
    phone:   { type: String, trim: true },
    message: { type: String, trim: true },
    goals:   { type: String, trim: true },
    source:  { type: String, trim: true },
    page:    { type: String, trim: true },
    meta:    { type: Object },
  },
  { timestamps: true }
);

ClientSchema.index({ email: 1 });

module.exports = model("Client", ClientSchema);
