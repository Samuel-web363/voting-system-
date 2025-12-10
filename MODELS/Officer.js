const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// OFFICER SCHEMA

const officerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: 6,
  },
  
  badgeNumber: {
    type: String,
    required: [true, "Badge number is required"],
    unique: true,
  },

  force: {
    type: String,
    enum: ["INEC", "Police", "Military", "Civil Service"],
    required: [true, "Force/Department is required"],
  },

  state: {
    type: String,
    required: [true, "State is required"],
  },

  role: {
    type: String,
    enum: ["officer", "admin"],
    default: "officer",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Officer = mongoose.model("Officer", officerSchema);

module.exports = {
  Officer,
};