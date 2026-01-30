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

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const images = (req.files || []).map(
      (file) => `${baseUrl}/uploads/${file.filename}`
    );

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

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ sold: false })
      .populate("postedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({
      postedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    console.error("Get my services error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("postedBy", "fullName phoneNumber");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
