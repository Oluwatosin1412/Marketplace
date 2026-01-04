import Service from "../models/Services.js";

export const createService = async (req, res) => {
  try {
    const {
  title,
  description,
  price,
  category,
  location,
  customAddress,
} = req.body || {};


    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !location
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const images = (req.files || []).map((file) => file.filename);

    const service = await Service.create({
      title,
      description,
      price: Number(price),
      category,
      location,
      customAddress: customAddress || "",
      images,
      postedBy: req.user._id,
    });

    res.status(201).json({ message: "Service posted successfully", service });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
