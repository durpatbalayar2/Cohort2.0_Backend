const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Multer upload middleware
const imageUpload = upload.single("image");

//POST - api/posts [protected]

postRouter.post("/", imageUpload, postController.createPostController);

//GET /api/posts  [protected]
postRouter.get("/", postController.getPostController);

//GET /api/posts/details/:postId

// return an detail about specific post with the id
//Also check whether the post belongs to the user that the request come from
postRouter.get("/details/:postId", postController.getPostDetailsController);

module.exports = postRouter;
