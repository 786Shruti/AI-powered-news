const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const newsRoutes = require("./routes/newsRoutes");
const cors = require("cors");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for frontend-backend communication
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// API Routes
app.use("/api/news", newsRoutes);

// Health check route (useful for Render)
app.get("/", (req, res) => {
  res.send("✅ API is running on Render...");
});

// Port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
