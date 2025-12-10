const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Voter is required"],
    unique: true,
  },

  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: [true, "Candidate is required"],
  },

  electionType: {
    type: String,
    enum: ["presidential", "parliamentary", "local"],
    required: [true, "Election type is required"],
  },

  votedAt: {
    type: Date,
    default: Date.now,
  },

  voteStatus: {
    type: String,
    enum: ["submitted", "counted", "disputed"],
    default: "submitted",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = {
  Vote,
};