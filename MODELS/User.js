const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// USER SCHEMA

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },

  userId: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: [true, "State is required"],
  },

  nin: {
    type: Number,
    required: [true, "NIN is required"],
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

  isverified: {
    type: Boolean,
    default: false,
  },

  hasvoted: {
    type: Boolean,
    default: false,
  },

  verificationStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },

  verifiedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Officer",
  },

  verfieidAt: {
    type: Date,
  },

  role: {
    type: String,
    enum: ["voter"],
    default: "voter",
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },



});



const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};