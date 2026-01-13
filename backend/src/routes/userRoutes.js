import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import admin from "../middlewares/admin.js";
import { getAllUsers } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.get("/all-users", protect, admin, getAllUsers);
router.delete("/delete-user/:id", protect, admin, deleteUser);

export default router;
