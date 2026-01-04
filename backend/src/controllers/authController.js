import jwt from "jsonwebtoken";
import validator from "validator";
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