const express = require("express");
const router = express.Router();
const {
  getNews,
  addNews,
  getIndiaNews,
  getMaharashtraNews,
  getPuneNews,
} = require("../controllers/newsController");

// Import the auth middleware
const protect = require("../middleware/authMiddleware");

// ===== MongoDB News (Protected) =====
// Only logged-in users can access these routes
router.get("/", protect, getNews);   // Get logged-in user's saved news
router.post("/", protect, addNews);  // Save news to user's collection

// ===== Public API News =====
// These are available to everyone
router.get("/india-news", getIndiaNews);                 // Latest India news
router.get("/maharashtra-news", getMaharashtraNews);     // Latest Maharashtra news
router.get("/pune-news", getPuneNews);                  // Latest Pune / Pimpri-Chinchwad news

module.exports = router;
