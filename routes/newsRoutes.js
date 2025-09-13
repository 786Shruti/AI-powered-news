const express = require("express");
const router = express.Router();
const {
  getNews,
  addNews,
  getIndiaNews,
  getMaharashtraNews,
  getPuneNews
} = require("../controllers/newsController");

// ===== MongoDB News =====
router.get("/", getNews);       // Get all news from DB
router.post("/", addNews);      // Add news to DB

// ===== Currents API News =====
router.get("/india-news", getIndiaNews);                 // Latest India news
router.get("/maharashtra-news", getMaharashtraNews);     // Latest Maharashtra news
router.get("/pune-news", getPuneNews);                  // Latest Pune / Pimpri-Chinchwad news

module.exports = router;
