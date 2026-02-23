const postModel = require("../models/posts.model");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

// Initialize ImageKit
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Create post controller

async function createPostController(req, res) {
  //   console.log(req.body,req.file);

  // image file uplaoding logic to imagekit
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  // post creation logic

  // We need caption ,imgUrl & user id to create a post
  // caption -> req.body
  //imgUrl ->imagekit response
  // user id ->  get from stored token in cookie

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

// Get post controller

async function getPostController(req, res) {
  //Data from middleware
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({ message: "Post Fetched Successfully", posts });
}

// Get post details controller

async function getPostDetailsController(req, res) {
  //Data from middleware
  const userId = req.user.id;

  // Get post ID from URL params
  const postId = req.params.postId;

  // 3. Fetch post from database
  const post = await postModel.findById(postId);

  // If post not found
  if (!post)
    return res.status(404).json({
      message: "Post not found",
    });

  // 4. Check if post belongs to logged-in user
  const isValidPost = post.user.toString() === userId;

  if (!isValidPost)
    return res.status(403).json({
      message: "Forbidden content",
    });

  // 5. Send post details
  res.status(200).json({
    message: "Post details fetched successfully",
    post,
  });
}

// Like post controller

async function likePostController(req, res) {
  // Get username from auth middleware
  const username = req.user.username;

  // post id from url params
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post)
    return res.status(404).json({
      message: "Post not found",
    });

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
};
