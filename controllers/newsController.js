const News = require("../models/News");
const axios = require("axios");
const { summarizeText, analyzeSentiment } = require("../utils/nlp"); 

// ======= API KEYS =======
const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY;
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

// ======= MongoDB News =======

// GET all saved news for the logged-in user
const getNews = async (req, res) => {
  try {
    // Only return news created by this user
    const news = await News.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST add news to DB (tied to logged-in user)
const addNews = async (req, res) => {
  const { title, content, source, url, image } = req.body;
  try {
    const text = content || title;

    // Add summary + sentiment
    const summary = summarizeText(text);
    const sentiment = analyzeSentiment(text);

    const news = new News({ 
      user: req.user._id, // tie news to logged-in user
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

// ======= Helper function to fetch news from APIs =======
const fetchNews = async (currentsUrl, newsApiUrl, fallbackNews) => {
  try {
    const response = await axios.get(currentsUrl);
    return response.data.news;
  } catch (err1) {
    console.warn("Currents API failed, trying NewsAPI:", err1.message);

    try {
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

// ======= Public News Endpoints (remain unchanged) =======
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

  const filtered = news.filter(article =>
    !article.title.toLowerCase().includes("maharashtra") &&
    !article.title.toLowerCase().includes("pune")
  );

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
