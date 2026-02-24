// User le post create , post fetch , post details fetch garne garxa

const express = require("express");
const postController = require("../controllers/post.controller");
const postRouter = express.Router();

const multer = require("multer");
const { userIdentify } = require("../middlewares/auth.middleware");

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Middleware to handle file uploads for post creation
const imageUpload = upload.single("image");

/**
 * @route POST / api/posts
 * @desc Create a post
 * @access Protected
 */

postRouter.post(
  "/",
  imageUpload,
  userIdentify,
  postController.createPostController,
);

/**
 * @route GET / api/posts
 * @desc Get all posts
 * @access Protected
 */

postRouter.get("/", userIdentify, postController.getPostController);

/**
 * @route GET /api/posts/details/:postId
 * @desc Get post details by postId
 * @access Protected
 */
postRouter.get(
  "/details/:postId",
  userIdentify,
  postController.getPostDetailsController,
);

/**
 * @route POST /api/posts/like/:postId
 * @desc Like a post
 * @access Protected
 */

postRouter.post(
  "/like/:postId",
  userIdentify,
  postController.likePostController,
);

/**
 * @route POST /api/posts/unlike/:postId
 * @description Unlike a post
 * @access Protected
 */

postRouter.post(
  "/unlike/:postId",
  userIdentify,
  postController.unlikePostController,
);

module.exports = postRouter;
