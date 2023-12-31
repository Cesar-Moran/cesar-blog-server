const { Router } = require("express");
const createPost = require("../controllers/post.controllers").createPost;
const multer = require("multer");
const upload = multer(); // Configuración básica de multer
const displayAllPosts =
  require("../controllers/post.controllers").displayAllPosts;
const singlePostProperties =
  require("../controllers/post.controllers").singlePostProperties;
const router = Router();

router.post("/api/createPost", upload.single("image"), createPost);
router.get("/api/getPosts", displayAllPosts);
router.get("/api/getSinglePostProperties/:id", singlePostProperties);

module.exports = router;
