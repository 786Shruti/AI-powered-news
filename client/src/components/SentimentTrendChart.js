import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SentimentTrendChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Backend base URL
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/news`); // saved news
        const news = res.data;

        if (!news || news.length === 0) {
          setChartData({ labels: [], datasets: [] });
          return;
        }

        // Count sentiment occurrences per day
        const sentimentCount = {};

        news.forEach((item) => {
          const date = item.date
            ? new Date(item.date).toISOString().split("T")[0]
            : "Unknown";
          if (!sentimentCount[date])
            sentimentCount[date] = { positive: 0, negative: 0, neutral: 0 };

          const sentiment = item.sentiment?.toLowerCase() || "neutral";
          if (sentiment === "positive") sentimentCount[date].positive++;
          else if (sentiment === "negative") sentimentCount[date].negative++;
          else sentimentCount[date].neutral++;
        });

        const labels = Object.keys(sentimentCount).sort();
        const positiveData = labels.map((label) => sentimentCount[label].positive);
        const negativeData = labels.map((label) => sentimentCount[label].negative);
        const neutralData = labels.map((label) => sentimentCount[label].neutral);

        setChartData({
          labels,
          datasets: [
            {
              label: "Positive",
              data: positiveData,
              borderColor: "green",
              backgroundColor: "rgba(0,255,0,0.2)",
            },
            {
              label: "Negative",
              data: negativeData,
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.2)",
            },
            {
              label: "Neutral",
              data: neutralData,
              borderColor: "gray",
              backgroundColor: "rgba(128,128,128,0.2)",
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching sentiment data:", err);
      }
    };

    fetchSentimentData();
  }, [API_BASE]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Sentiment Trend Over Time" },
          },
        }}
      />
    </div>
  );
}

export default SentimentTrendChart;
