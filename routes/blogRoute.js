const express = require("express");

const router = express.Router();

const {
  createRender,
  displayBlog,
  blogSave,
  blogDetails,
  deleteBlog,
  aboutBlog,
  updateBlog,
  editform,
} = require("../controller/BlogController");

router.get("/blogs/create", createRender);

// blog routes
router.get("/blogs", displayBlog);

router.post("/blogs", blogSave);
router.get("/blogs/:id", blogDetails);
router.get("/blogs/:id/update", editform);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);
router.get("/about", aboutBlog);
module.exports = router;
