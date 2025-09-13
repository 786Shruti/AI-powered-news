const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const newsRoutes = require("./routes/newsRoutes");
const cors = require("cors");
const path = require("path");

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

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Health check route (useful for Render)
app.get("/api/health", (req, res) => {
  res.send("✅ API is running on Render...");
});

// Port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
