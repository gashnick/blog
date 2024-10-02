const Blog = require("../models/blog");

const createRender = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};

const displayBlog = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogDetails = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
};
const editform = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).render("404");
      }
      res.render("blogs/update", { title: "Edit Blog", blog });
    })
    .catch((err) => {
      console.log(err);
    });
};
const updateBlog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteBlog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const aboutBlog = (req, res) => {
  res.render("blogs/about", { title: "About" });
};
const blogSave = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createRender,
  displayBlog,
  blogDetails,
  deleteBlog,
  aboutBlog,
  blogSave,
  updateBlog,
  editform,
};
