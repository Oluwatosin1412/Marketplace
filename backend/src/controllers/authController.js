import jwt from "jsonwebtoken";
import validator from "validator";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";


const passwordRequirements =
  /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;



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

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }


    if (!passwordRequirements.test(password)) {
      return res
        .status(400)
        .json({
          message:
          "Password must be at least 6 characters long and include at least one number and one special character",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      fullName,
      email,
      matricNumber,
      phoneNumber,
      faculty,
      department,
      password,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { emailOrId, password } = req.body;

    if (!emailOrId || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrId.toLowerCase() }, { matricNumber: emailOrId }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        matricNumber: user.matricNumber,
        phoneNumber: user.phoneNumber,
        faculty: user.faculty,
        department: user.department,
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "If an account exists with this email, a reset link has been sent."
      });
    }

    // Use method from User.js to generate token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    const resetUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const message = {
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      message: "If an account exists with this email, a reset link has been sent."
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // note the corrected field name
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

