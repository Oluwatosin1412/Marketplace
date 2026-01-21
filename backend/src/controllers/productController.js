import Product from "../models/Products.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      condition,
      location,
      customAddress,
    } = req.body || {};

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !condition ||
      !location
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const images = (req.files || []).map((file) => file.filename);

    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      condition,
      location,
      customAddress: customAddress || "",
      images,
      postedBy: req.user._id,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ sold: false })
      .populate("postedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      postedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Get my products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("postedBy", "fullName phoneNumber");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
