import jwt from "jsonwebtoken";
import validator from "validator";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const passwordRequirements = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
const isProduction = process.env.NODE_ENV === "production";

/* ================= TOKEN COOKIE HELPER ================= */
const sendRefreshToken = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: isProduction,      // MUST be true on Render
    sameSite: "none",          // REQUIRED for Vercel ↔ Render
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      matricNumber,
      phoneNumber,
      faculty,
      department,
      password,
      confirmPassword,
    } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword)
      return res.status(400).json({ message: "Required fields missing" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    if (!passwordRequirements.test(password))
      return res.status(400).json({ message: "Weak password" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({
      fullName,
      email,
      matricNumber,
      phoneNumber,
      faculty,
      department,
      password,
    });

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    sendRefreshToken(res, refreshToken);

    res.status(201).json({
      message: "Account created successfully",
      accessToken,
      user,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { emailOrId, password } = req.body;

    if (!emailOrId || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({
      $or: [{ email: emailOrId.toLowerCase() }, { matricNumber: emailOrId }],
    });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    sendRefreshToken(res, refreshToken);

    res.json({
      message: "Login successful",
      accessToken,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= REFRESH ================= */
export const refreshAccessToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      { id: payload.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    sameSite: "none",
    secure: isProduction,
  });
  res.json({ message: "Logged out" });
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(200).json({ message: "Reset email sent if account exists" });

    const resetToken = user.createPasswordResetToken();
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
    });

    res.json({ message: "Reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
