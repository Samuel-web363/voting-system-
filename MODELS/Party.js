const mongoose = require("mongoose");

// PARTY SCHEMA

const partySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slogan: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
