const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller");

const multer = require("multer");
const userIdentify = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

// Multer upload middleware
const imageUpload = upload.single("image");

//POST - api/posts [protected]

postRouter.post("/", imageUpload,userIdentify, postController.createPostController);

//GET /api/posts  [protected]
postRouter.get("/",userIdentify, postController.getPostController);

//GET /api/posts/details/:postId

// return an detail about specific post with the id
//Also check whether the post belongs to the user that the request come from
postRouter.get(
  "/details/:postId",
  userIdentify,
  postController.getPostDetailsController,
);

module.exports = postRouter;
