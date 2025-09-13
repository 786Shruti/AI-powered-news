import axios from "axios";

function NewsCard({ news }) {
  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/news", {
        title: news.title,
        content: news.content || news.description || news.summary || "No content",
        summary: news.summary,
        sentiment: news.sentiment,
        source: news.source?.name || news.source,
        url: news.url,
        image: news.image || news.urlToImage,
        date: news.date || news.publishedAt
      });
      alert("News saved successfully!");
    } catch (err) {
      console.error("Error saving news:", err);
      alert("Failed to save news.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      {news.urlToImage || news.image ? (
        <img
          src={news.urlToImage || news.image}
          alt={news.title || news.name}
          className="w-full h-56 object-cover"
        />
      ) : null}

      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          {news.title || news.name}
        </h3>

        {/* Published Date */}
        {news.date || news.publishedAt ? (
          <p className="text-sm text-gray-500 mb-2">
            {new Date(news.date || news.publishedAt).toLocaleString()}
          </p>
        ) : null}

        {/* Summary */}
        <p className="text-gray-700 mb-4 flex-1">
          {news.summary || news.description || news.content}
        </p>

        {/* Sentiment Badge */}
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

        {/* Buttons */}
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
