# AI-Powered News Summarizer
## 📰 MERN News App

A **Full-Stack MERN Project** that fetches real-time news, summarizes articles, and performs sentiment analysis.  
Built with **MongoDB, Express, React, Node.js**, and deployed on **Render**.

---

## 🚀 Features
- 🔎 **Fetch News**: Get the latest news articles using APIs  
- ✂️ **Summarization**: Automatic article summarization using `node-summarizer`  
- 😀 **Sentiment Analysis**: Detect if news is positive, negative, or neutral  
- 💾 **Save Articles**: Store favorite news in MongoDB  
- 📊 **Trends Dashboard**: Visualize news sentiment & categories  
- 🌐 **Full Deployment**: Backend + Frontend live on Render (Free tier)

---

## 🛠️ Tech Stack
**Frontend**  
- React.js (UI)  
- Axios (API requests)  
- TailwindCSS (Styling)  

**Backend**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- Sentiment Analysis (npm `sentiment`)  
- Summarization (npm `node-summarizer`)  
- CORS + dotenv  

**Deployment**  
- Render (Frontend + Backend)  
- GitHub (Version control)

---

## 📂 Project Structure
- project-root/
- │── server.js             # Backend entry
- │── package.json          # Backend package.json
-│── /config               # DB connection
-│── /routes               # API routes
-│── /models               # MongoDB models
-│── /client               # React frontend
-│    ├── package.json     # Frontend package.json
-│    ├── src/             # React components
-│    └── public/
-│── .env.example          # Example environment variables

##⚡ Getting Started (Local Setup)
-1️⃣ Clone the repo
-git clone https://github.com/<your-username>/news-app.git
-cd news-app

-2️⃣ Setup Backend

-Create a .env file in root folder:
```bash
-MONGO_URI=your_mongodb_connection_string
-NODE_ENV=development
-PORT=5000
```

Install dependencies & start backend:
```bash
npm install
npm run dev   # starts backend with nodemon
# or
node server.js
```

Backend will run at 👉 http://localhost:5000

3️⃣ Setup Frontend

Move into client folder:
```bash
cd client
npm install
npm start
```

Frontend will run at 👉 http://localhost:3000

🌐 Deployment (Render)
Backend: Deploy root folder as a Web Service with
Build Command: npm install
Start Command: npm start
Environment Variables: MONGO_URI, NODE_ENV=production
Frontend: Deploy client folder as a Static Site with
Build Command: npm install && npm run build
Publish Directory: client/build
Update frontend axios base URL to your Render backend URL:
// example in frontend axios call
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});
Set REACT_APP_API_URL in Render frontend environment variables.

📜 Scripts
Backend (package.json)
```bash
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Frontend (client/package.json)
```bash
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```

🔑 Environment Variables
Copy .env.example → .env and update values.
```bash
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
PORT=5000
```
