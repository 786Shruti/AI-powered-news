// utils/nlp.js
const Sentiment = require("sentiment");
const { SummarizerManager } = require("node-summarizer");

const sentiment = new Sentiment();

function summarizeText(text) {
  if (!text) return "";
  try {
    const summarizer = new SummarizerManager(text, 3); // 3 sentences
    const summaryObj = summarizer.getSummaryByRank();
    return summaryObj.summary || text; // 👈 ensure you return summary string
  } catch (err) {
    console.error("Summarization error:", err.message);
    return text;
  }
}


// ===== Sentiment Analysis =====
function analyzeSentiment(text) {
  if (!text) return "neutral";
  try {
    const result = sentiment.analyze(text);
    if (result.score > 0) return "positive";
    if (result.score < 0) return "negative";
    return "neutral";
  } catch (err) {
    console.error("Sentiment error:", err.message);
    return "neutral";
  }
}

module.exports = { summarizeText, analyzeSentiment };
