import axios from "axios";

function NewsCard({ news, token }) {
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSave = async () => {
    if (!token) {
      alert("Please login to save news.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE}/api/news`,
        {
          title: news.title,
          content: news.content || news.description || news.summary || "No content",
          summary: news.summary,
          sentiment: news.sentiment,
          source: news.source?.name || news.source,
          url: news.url,
          image: news.image || news.urlToImage,
          date: news.date || news.publishedAt,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("News saved successfully!");
    } catch (err) {
      console.error("Error saving news:", err);
      alert(err.response?.data?.message || "Failed to save news.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {(news.urlToImage || news.image) && (
        <img
          src={news.urlToImage || news.image}
          alt={news.title || news.name}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{news.title || news.name}</h3>

        {(news.date || news.publishedAt) && (
          <p className="text-sm text-gray-500 mb-2">
            {new Date(news.date || news.publishedAt).toLocaleString()}
          </p>
        )}

        <p className="text-gray-700 mb-4 flex-1">{news.summary || news.description || news.content}</p>

        {news.sentiment && (
          <span
            className={`inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full self-start ${
              news.sentiment.toLowerCase() === "positive"
                ? "bg-green-100 text-green-800"
                : news.sentiment.toLowerCase() === "negative"
                ? "bg-red-100 text-red-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {news.sentiment}
          </span>
        )}

        <div className="flex justify-between items-center mt-auto">
          {news.url && (
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 font-bold hover:underline"
            >
              Read Full Article
            </a>
          )}

          <button
            onClick={handleSave}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 py-1 rounded-lg shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
