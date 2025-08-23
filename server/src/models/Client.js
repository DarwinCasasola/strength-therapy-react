import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, trim: true, lowercase: true, unique: true },
    phone:     { type: String, trim: true },
    goals:     { type: String, trim: true },
    notes:     { type: String, trim: true },
    // who created this client (Clerk user id)
    ownerId:   { type: String, required: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model("Client", ClientSchema);
