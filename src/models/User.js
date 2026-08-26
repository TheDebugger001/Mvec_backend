const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Fullname: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        // Required only if user did NOT register via Google OAuth
        return !this.googleId;
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: function () {
        return !this.googleId;
      },
    },
    phone: {
      type: String,
      unique: true,
      required: function () {
        return !this.googleId;
      },
      validate: {
        validator: function (v) {
          // If phone is empty (e.g. Google OAuth sign-up), skip regex validation
          if (!v) return true;
          // Accepts Rwandan format (+250788888888 or 0788888888)
          return /^(\+250|0)?7[2389]\d{7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents without a googleId
    },
    role: {
      type: String,
      enum: ["buyer", "vendor", "super_admin"],
      default: "buyer", // Fixed: Matches an item in the enum list
    },
    companyName: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;