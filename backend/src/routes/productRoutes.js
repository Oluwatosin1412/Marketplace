import express from "express";
import { createProduct } from "../controllers/productController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import Product from "../models/Products.js";

const router = express.Router();


router.post(
  "/",
  protect,
  upload.array("images", 5),
  createProduct
);

// Get all products
router.get("/", async (req,res) => {
  const products = await Product.find().populate("postedBy", "fullName email");
  res.json(products);
});

export default router;
