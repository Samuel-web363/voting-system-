// MASTER CONTROLLER FILE (User, Officer, Candidate, Party, Vote Controllers)

// IMPORT MODELS
const { User } = require("../MODELS/User");
const { Officer } = require("../MODELS/Officer");
const { Candidate } = require("../MODELS/Candidate");
const { Party } = require("../MODELS/Party");
const { Vote } = require("../MODELS/Vote");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===USER===

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, dob, userId, state, nin, email, password } = req.body;

    if (!name || !dob || !userId || !state || !nin || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      dob,
      userId,
      state,
      nin,
      email,
      password: hashed,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
  console.error(err); // <-- log the real error
  res.status(500).json({ message: err.message, stack: err.stack });
}

};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//== OFFICER ==

exports.registerOfficer = async (req, res) => {
  try {
    const { name, email, password, badgeNumber, force, state } = req.body;

    if (!name || !email || !password || !badgeNumber || !force || !state)
      return res.status(400).json({ message: "All fields required" });

    const exists = await Officer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Officer already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const officer = await Officer.create({ name, email, password: hashed, badgeNumber, force, state });

    res.status(201).json({ message: "Officer registered", officer });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN OFFICER
exports.loginOfficer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const officer = await Officer.findOne({ email });
    if (!officer) return res.status(404).json({ message: "Officer not found" });

    const match = await bcrypt.compare(password, officer.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: officer._id, role: officer.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, officer });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//==PARTY===

exports.createParty = async (req, res) => {
  try {
    const { name, slogan } = req.body;

    if (!name || !slogan)
      return res.status(400).json({ message: "Name and slogan required" });

    const exists = await Party.findOne({ name });
    if (exists) return res.status(400).json({ message: "Party already exists" });

    const party = await Party.create({ name, slogan });

    res.status(201).json({ message: "Party created", party });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//== CANDIDATE==
exports.createCandidate = async (req, res) => {
  try {
    const { name, candidateId, state, dob, position, email, party, biography } = req.body;

    if (!name || !candidateId || !state || !dob || !position || !email || !party)
      return res.status(400).json({ message: "All required fields must be filled" });

    const exists = await Candidate.findOne({ email });
    if (exists) return res.status(400).json({ message: "Candidate already exists" });

    const candidate = await Candidate.create({
      name,
      candidateId,
      state,
      dob,
      position,
      email,
      party,
      biography,
    });

    res.status(201).json({ message: "Candidate created", candidate });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//== VOTE==
exports.castVote = async (req, res) => {
  try {
    const { voter, candidate, electionType } = req.body;

    if (!voter || !candidate || !electionType)
      return res.status(400).json({ message: "All fields required" });

    const alreadyVoted = await Vote.findOne({ voter });
    if (alreadyVoted)
      return res.status(400).json({ message: "User has already voted" });

    const vote = await Vote.create({ voter, candidate, electionType });

    await Candidate.findByIdAndUpdate(candidate, { $inc: { voteCount: 1 } });

    res.status(201).json({ message: "Vote submitted", vote });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
