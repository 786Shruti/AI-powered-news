import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const newsUrl = "/api/news/india-news"; // public news feed

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}${newsUrl}`);
        setNews(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [API_BASE]);

  const filteredNews = news.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-yellow-400">AI-Powered News Summarizer</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200">
          Explore the latest headlines instantly. Log in to save articles and view analytics.
        </p>

        {/* Login / Signup Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Public News Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Latest News
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Error or Loading */}
        {loading && <p className="text-center text-gray-500">Loading news...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !error && filteredNews.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No news found.</p>
          )}
          {!loading &&
            !error &&
            filteredNews.map((item, index) => (
              <NewsCard key={item._id || index} news={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
