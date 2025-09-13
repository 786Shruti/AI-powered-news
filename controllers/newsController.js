const News = require("../models/News");
const axios = require("axios");
const { summarizeText, analyzeSentiment } = require("../utils/nlp"); // 👈 added

// ======= API KEYS =======
const CURRENTS_API_KEY = '9GIrS59ZYK93iqSwqAkii31uikGS_oNj1U6WMDElAUdveS-h';
const NEWSAPI_KEY = '0252c09290da40ef91f4cca6052a6e28'; 

// ======= MongoDB News =======

// GET all saved news (Saved News tab)
const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST add news to DB
const addNews = async (req, res) => {
  const { title, content, source, url, image } = req.body;
  try {
    const text = content || title;

    // 👇 add summary + sentiment before saving
    const summary = summarizeText(text);
    const sentiment = analyzeSentiment(text);

    const news = new News({ 
      title, 
      content, 
      source, 
      url, 
      image,
      summary,
      sentiment
    });

    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======= Helper function to fetch news =======
const fetchNews = async (currentsUrl, newsApiUrl, fallbackNews) => {
  try {
    // First try Currents API
    const response = await axios.get(currentsUrl);
    return response.data.news;
  } catch (err1) {
    console.warn("Currents API failed, trying NewsAPI:", err1.message);

    try {
      // If Currents fails, fallback to NewsAPI
      const response2 = await axios.get(newsApiUrl);
      return response2.data.articles.map(a => ({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.urlToImage,
        source: a.source.name
      }));
    } catch (err2) {
      console.error("NewsAPI failed too:", err2.message);
      return fallbackNews;
    }
  }
};

// ======= News Endpoints =======

// India news (exclude Maharashtra/Pune)
const getIndiaNews = async (req, res) => {
    const currentsUrl = `https://api.currentsapi.services/v1/search?keywords=india&language=en&apiKey=${CURRENTS_API_KEY}`;
  const newsApiUrl = `https://newsapi.org/v2/everything?q=india&apiKey=${NEWSAPI_KEY}`;
  const fallback = [{
    title: "Sample India News",
    description: "This is sample India news due to API limit.",
    url: "#",
    image: "https://via.placeholder.com/400x200"
  }];

  const news = await fetchNews(currentsUrl, newsApiUrl, fallback);

  // filter out Maharashtra/Pune from India news
  const filtered = news.filter(article =>
    !article.title.toLowerCase().includes("maharashtra") &&
    !article.title.toLowerCase().includes("pune")
  );

  // 👇 add summary + sentiment
  const processed = filtered.map(article => {
    const text = article.description || article.title;
    return {
      ...article,
      summary: summarizeText(text),
      sentiment: analyzeSentiment(text)
    };
  });

  res.json(processed);
};

// Maharashtra news
const getMaharashtraNews = async (req, res) => {
  const currentsUrl = `https://api.currentsapi.services/v1/search?keywords=maharashtra&language=en&apiKey=${CURRENTS_API_KEY}`;
  const newsApiUrl = `https://newsapi.org/v2/everything?q=maharashtra&apiKey=${NEWSAPI_KEY}`;
  const fallback = [{
    title: "Sample Maharashtra News",
    description: "This is sample Maharashtra news due to API limit.",
    url: "#",
    image: "https://via.placeholder.com/400x200"
  }];

  const news = await fetchNews(currentsUrl, newsApiUrl, fallback);

  const processed = news.map(article => {
    const text = article.description || article.title;
    return {
      ...article,
      summary: summarizeText(text),
      sentiment: analyzeSentiment(text)
    };
  });

  res.json(processed);
};

// Pune / Pimpri-Chinchwad news
const getPuneNews = async (req, res) => {
  const currentsUrl = `https://api.currentsapi.services/v1/search?keywords=pune OR "pimpri chinchwad"&language=en&apiKey=${CURRENTS_API_KEY}`;
  const newsApiUrl = `https://newsapi.org/v2/everything?q=pune OR "pimpri chinchwad"&apiKey=${NEWSAPI_KEY}`;
  const fallback = [{
    title: "Sample Pune News",
    description: "This is sample Pune news due to API limit.",
    url: "#",
    image: "https://via.placeholder.com/400x200"
  }];

  const news = await fetchNews(currentsUrl, newsApiUrl, fallback);

  const processed = news.map(article => {
    const text = article.description || article.title;
    return {
      ...article,
      summary: summarizeText(text),
      sentiment: analyzeSentiment(text)
    };
  });

  res.json(processed);
};

module.exports = { getNews, addNews, getIndiaNews, getMaharashtraNews, getPuneNews };
