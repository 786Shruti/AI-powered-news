import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import SentimentTrendChart from "../components/SentimentTrendChart"; // Chart.js component

// Tabs for filtering news
const tabs = [
  { id: "db", label: "Saved News" },
  { id: "india", label: "India News" },
  { id: "maharashtra", label: "Maharashtra News" },
  { id: "pune", label: "Pune / Pimpri-Chinchwad News" },
];

function Home() {
  // State for active tab in news
  const [activeTab, setActiveTab] = useState("db");
  // State for fetched news
  const [news, setNews] = useState([]);
  // State for search input
  const [search, setSearch] = useState("");
  // State to toggle view: news first, dashboard second
  const [view, setView] = useState("news"); // default "news"

  // Fetch news when activeTab or view changes
  useEffect(() => {
    if (view === "news") {
      const fetchNews = async () => {
        let url = "";
        switch (activeTab) {
          case "db":
            url = "http://localhost:5000/api/news/";
            break;
          case "india":
            url = "http://localhost:5000/api/news/india-news";
            break;
          case "maharashtra":
            url = "http://localhost:5000/api/news/maharashtra-news";
            break;
          case "pune":
            url = "http://localhost:5000/api/news/pune-news";
            break;
          default:
            url = "http://localhost:5000/api/news/";
        }

        try {
          const res = await axios.get(url);
          setNews(res.data);
        } catch (err) {
          console.error("Error fetching news:", err);
        }
      };

      fetchNews();
    }
  }, [activeTab, view]);

  // Filter news based on search
  const filteredNews = news.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ================= Hero Section ================= */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI-Powered <span className="text-yellow-400">News Summarizer</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200">
          Summarize and explore the latest headlines instantly. Stay informed with AI-powered insights.
        </p>
      </div>

      {/* ================= View Toggle Buttons ================= */}
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

      {/* ================= Conditional Rendering ================= */}
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

          {/* News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No news found.
              </p>
            ) : (
              filteredNews.map((item, index) => (
                <NewsCard key={item._id || index} news={item} />
              ))
            )}
          </div>
        </div>
      )}

      {view === "dashboard" && (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Sentiment Analytics
          </h2>
          <SentimentTrendChart />
        </div>
      )}
    </>
  );
}

export default Home;
