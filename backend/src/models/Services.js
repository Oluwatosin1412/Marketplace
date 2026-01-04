import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  price: String,
  category: String,
  location: String,
  customAddress: String,
  images: [String],
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
