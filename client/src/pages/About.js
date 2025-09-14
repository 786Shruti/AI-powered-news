import React from "react";

function About() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        {/* Project Info */}
        <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Project</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-10">
          This is a MERN stack AI-Powered News Summarizer & Dashboard. News are fetched from real-time APIs and summarized with AI for faster reading.
        </p>

        {/* Creator Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Created By</h3>
          <p className="text-gray-700 mb-2"><strong>Name:</strong> Shruti Satish Pol</p>
          <p className="text-gray-700"><strong>Role:</strong> Full Stack Developer</p>
        </div>
      </div>
    </section>
  );
}

export default About;
