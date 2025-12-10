const mongoose = require("mongoose");

// CANDIDATE SCHEMA

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  candidateId: {
    type: String,
    required: [true, "Candidate ID is required"],
    unique: true,
  },

  state: {
    type: String,
    required: [true, "State is required"],
  },

  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },

  position: {
    type: String,
    enum: ["presidential", "gubernatorial", "senatorial", "representative"],
    required: [true, "Position is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
  },

  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: [true, "Party is required"],
  },

  biography: {
    type: String,
    trim: true,
  },

  voteCount: {
    type: Number,
    default: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  votesCount: {
    type: Number,
    default: 0,
  },
  
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = {
  Candidate,
};