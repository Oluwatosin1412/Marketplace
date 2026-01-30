import "./config/env.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from backend/.env
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});


const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Middleware
app.use(
  cors({
    origin: [
      "https://marketplace-two-rosy.vercel.app",
      "https://marketplace-ojurh44cg-oluwatosin1412s-projects.vercel.app",
      "https://marketplace-pavh5nr61-oluwatosin1412s-projects.vercel.app",
      "https://marketplace-git-main-oluwatosin1412s-projects.vercel.app",
      "http://localhost:8080/",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

// ✅ This will now work
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Backend running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("MongoDB connection error:", err));
