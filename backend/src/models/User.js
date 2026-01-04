import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    matricNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    faculty: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // --- Forgot/Reset Password Fields ---
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate reset password token
userSchema.methods.createPasswordResetToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token and store in DB
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expiration (e.g., 1 hour)
  this.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

  // Return unhashed token (to send via email)
  return resetToken;
};

export default mongoose.model("User", userSchema);
