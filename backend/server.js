require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplaination } = require("./controllers/aiController");

const app = express();

//middleware to cors
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

//middleware to parse json
app.use(express.json());

//Routes
//auth Routes
app.use("/api/auth", authRoutes);
//session Routes
app.use("/api/sessions", sessionRoutes);
//question Routes
app.use("/api/questions", questionRoutes);

//ai Routes
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplaination);

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle SPA routing: serve index.html for any unknown route
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

//Start Server 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));