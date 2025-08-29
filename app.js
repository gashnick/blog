require("dotenv").config(); // Load environment variables

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const router = require("./routes/blogRoute");
const methodOverride = require("method-override");

const app = express();

// Use environment variable for MongoDB URI
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("🚀 Server running on port 3000"));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => res.redirect("/blogs"));
app.use(router);

// 404 Page
app.use((req, res) => res.status(404).render("404", { title: "404" }));

module.exports = app;
