import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import SentimentTrendChart from "../components/SentimentTrendChart";

// Tabs for filtering news
const tabs = [
  { id: "db", label: "Saved News" },
  { id: "india", label: "India News" },
  { id: "maharashtra", label: "Maharashtra News" },
  { id: "pune", label: "Pune / Pimpri-Chinchwad News" },
];

function Home() {
  const [activeTab, setActiveTab] = useState("db");
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("news");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token"); // JWT token

  useEffect(() => {
    if (view !== "news") return;

    const fetchNews = async () => {
      // Define tab URLs inside effect to avoid missing dependency warning
      const tabUrls = {
        db: "/api/news/",
        india: "/api/news/india-news",
        maharashtra: "/api/news/maharashtra-news",
        pune: "/api/news/pune-news",
      };

      setLoading(true);
      try {
        const url = `${API_BASE}${tabUrls[activeTab] || tabUrls["db"]}`;

        // Send JWT only for saved news
        const headers = activeTab === "db" && token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(url, { headers });

        setNews(Array.isArray(res.data) ? res.data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news. Please try again later.");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeTab, view, API_BASE, token]); // ✅ Fixed dependencies

  // Filter news by search term
  const filteredNews = news.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI-Powered <span className="text-yellow-400">News Summarizer</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200">
          Summarize and explore the latest headlines instantly. Stay informed with AI-powered insights.
        </p>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex justify-center my-6 space-x-4">
        <button
          onClick={() => setView("news")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            view === "news"
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          News Content
        </button>
        <button
          onClick={() => setView("dashboard")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            view === "dashboard"
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Analytics Dashboard
        </button>
      </div>

      {/* News View */}
      {view === "news" && (
        <div className="container mx-auto px-6 py-12">
          {/* Tabs */}
          <div className="flex justify-center mb-6 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 -mb-px font-semibold border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-yellow-400 text-yellow-400"
                    : "border-transparent hover:text-yellow-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

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

          {/* Loading / Error */}
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
                <NewsCard key={item._id || index} news={item} token={token} />
              ))}
          </div>
        </div>
      )}

      {/* Dashboard View */}
      {view === "dashboard" && (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sentiment Analytics</h2>
          <SentimentTrendChart />
        </div>
      )}
    </>
  );
}

export default Home;
