const moongoose = require("mongoose");

// PARTY SCHEMA

const partySchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "Party name is required"],
    trim: true,
    unique: true,
  },

  slogan: {
    type: String,
    required: [true, "Party slogan is required"],
    trim: true,
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

const Party = mongoose.model("Party", partySchema);

module.exports = {
  Party,
};
