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
