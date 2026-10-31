
const express = require("express");
const router = express.Router();

// Same user authentication middleware as package.js
const authMiddleware = require("../middleware/authMiddleware");

const {
  getRoyaltySummary,
} = require("../controllers/royaltyPoolController");

// Logged-in users can view royalty summary
router.get("/summary", authMiddleware, getRoyaltySummary);

module.exports = router;
