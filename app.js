const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const router = require("./routes/blogRoute");
const methodOverride = require("method-override");
// create express app

const app = express();

// connect to mongo db
const dbURI =
  "mongodb+srv://netninja:test12345@nodetuts.6ilyu.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
app.set("view engine", "ejs");

// listening requests

// middlewares and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.use(router);
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
