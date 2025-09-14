const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to user
  title: { type: String, required: true },
  content: { type: String },
  summary: { type: String },
  sentiment: { type: String },
  source: { type: String },
  url: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
