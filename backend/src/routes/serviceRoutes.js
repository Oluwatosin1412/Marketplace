import express from "express";
import { createService,getMyServices,
  getSingleService, } from "../controllers/serviceController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import Service from "../models/Services.js";


const router = express.Router();


router.post(
  "/",
  protect,
  upload.array("images", 3),
  createService
);

// Get all services
router.get("/", async (req,res) => {
  const services = await Service.find().populate("postedBy", "fullName email");
  res.json(services);
});

router.get("/mine", protect, getMyServices);

router.get("/:id", getSingleService);

export default router;
