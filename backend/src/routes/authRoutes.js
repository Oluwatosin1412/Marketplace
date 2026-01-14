import express from "express";
import { loginUser, registerUser,forgotPassword,resetPassword,refreshAccessToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post('/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/refresh", refreshAccessToken);


export default router;
