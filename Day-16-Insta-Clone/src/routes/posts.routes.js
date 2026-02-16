const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Multer upload middleware
const imageUpload = upload.single("image");

//POST - api/posts

postRouter.post("/", imageUpload, postController.createPostController);

module.exports = postRouter;
