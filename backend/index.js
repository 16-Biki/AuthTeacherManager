// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "https://auth-teacher-manager.vercel.app",    // old frontend (if used)
    "https://auth-teacher-manager-ra1r.vercel.app", // ✅ your deployed frontend
    "http://localhost:5173"                       // local testing
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
