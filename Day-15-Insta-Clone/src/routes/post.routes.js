const express = require("express");
const PostController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });



const postRouter = express.Router();

// Post routes <-- this is proctected routes means valid token access can access this route
// POST -/ api/posts

postRouter.post(
  "/",
  upload.single("image"),
  PostController.createPostController,
);

module.exports = postRouter;
