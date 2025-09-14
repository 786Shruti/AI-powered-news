import React from "react";
import SentimentTrendChart from "../components/SentimentTrendChart";

function Dashboard() {
  return (
    React.createElement("div", { className: "p-6 bg-gray-50 min-h-screen" },
      React.createElement("h1", { className: "text-3xl font-bold mb-6 text-gray-800" }, "Analytics Dashboard"),
      React.createElement(SentimentTrendChart, null)
    )
  );
}

export default Dashboard;
