import express from "express";
import {
  createProduct,
  getMyProducts,
  getSingleProduct,
} from "../controllers/productController.js";
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

router.get("/", async (req, res) => {
  const products = await Product.find({ sold: false })
    .populate("postedBy", "fullName email")
    .sort({ createdAt: -1 });

  res.json(products);
});

router.get("/mine", protect, getMyProducts);

router.get("/:id", getSingleProduct);

export default router;
