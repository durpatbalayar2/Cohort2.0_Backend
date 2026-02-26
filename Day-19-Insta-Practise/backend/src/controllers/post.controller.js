const ImageKit = require("@imagekit/nodejs");
const mongoose = require("mongoose");

const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/posts.model");
const likeModel = require("../models/like.model");
// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  // console.log(req.body, req.file);
  // Upload the image to ImageKit

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  // Post Creation logic

  /**
   * We need caption , imageURL  &  userId to create a post
   * caption -> req.body
   * imageURL -> file.url
   * userId -> get from stored token in cookies (req.user.id)
   * Now for getting userId from token we need to create a middleware that will verify the token and store the user details in req.user
   * After creating the post we can send the response to client
   *
   */

  const post = await postModel.create({
    caption: req.body.caption,
    imgURL: file.url,
    user: req.user.id, // req.user is set by the auth middleware after verifying the token
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  /**
   * Get all the posts
   */

  const userId = req.user.id; // Get userId from req.user set by auth middleware

  const posts = await postModel.find({
    user: userId,
  });
  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  /**
   * Get post details by postId
   * postId will be sent as a URL parameter. We can access it in the controller using req.params.postId
   */

  const postId = req.params.postId; // Get postId from URL parameters
  const userId = req.user.id; // Get userId from req.user set by auth middleware
  const postDetails = await postModel.findById(postId);

  // If post not found

  if (!postDetails) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  /**
   * Check if the post belongs to logged-in user
   * postDetails.user → ObjectId type
   * userId (req.user.id) → String type
   * So we need to convert postDetails.user to string before comparing with userId
   */
  const IsValidPost = postDetails.user.toString() === userId;

  if (!IsValidPost) {
    return res.status(403).json({
      message: "Unauthorized access to post details",
    });
  }

  res.status(200).json({
    message: "Post details fetched successfully",
    postDetails,
  });
}

async function likePostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;


   // ✅ Validate ObjectId first
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

  //1. Check if post exist or not
  const post = await postModel.findById(postId);

  if (!post)
    return res.status(404).json({
      message: "Post not found",
    });

  //2.Check if post already liked by the user or not

  const isAlreadyLiked = await likeModel.findOne({
    user: userId,
    post: postId,
  });

  if (isAlreadyLiked)
    return res.status(409).json({
      message: "You have already liked this post",
    });

  // 3 if not like then create a like record
  const like = await likeModel.create({
    user: userId,
    post: postId,
  });

  // 4. Send response

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

async function unlikePostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  //1. check user liked the post or not

  const isliked = await likeModel.findOne({
    user: userId,
    post: postId,
  });

  if (!isliked) {
    return res.status(404).json({
      message: "You have not liked this post ",
    });
  }

  //2. If liked then delete the like record

  await likeModel.findByIdAndDelete(isliked._id);

  //3. Send response
  res.status(200).json({
    message: "Post unliked successfully",
  });
}
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
};
