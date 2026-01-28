import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  price: String,
  category: String,
  location: String,
  customAddress: String,
  images: [{ type: String }],
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      sold: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
export default mongoose.model("Service", serviceSchema);
