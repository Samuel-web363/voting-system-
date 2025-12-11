// MASTER ROUTES FILE (Users, Officers, Parties, Candidates, Votes)

const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {
  registerUser,
  loginUser,
  registerOfficer,
  loginOfficer,
  createParty,
  createCandidate,
  castVote,
} = require("../CONTROLLERS/authCtrl");

// OPTIONAL AUTH MIDDLEWARE
// const auth = require("../middleware/authMiddleware");

// == USER ROUTES ==
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// == OFFICER ROUTES ==
router.post("/officers/register", registerOfficer);
router.post("/officers/login", loginOfficer);

// == PARTY ROUTES ==
router.post("/parties/create", createParty);

// == CANDIDATE ROUTES ==
router.post("/candidates/create", createCandidate);

//== VOTE ROUTES ==
router.post("/votes/cast", castVote);

// EXPORT
module.exports = router;