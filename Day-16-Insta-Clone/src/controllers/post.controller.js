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
  try {
    const username = req.user.username;
    const postId = req.params.postId;

    // Check if post exists
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if already liked
    const existingLike = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (existingLike) {
      return res.status(409).json({
        message: "You have already liked this post",
      });
    }

    // Create like
    const like = await likeModel.create({
      post: postId,
      user: username,
    });

    return res.status(201).json({
      message: "Post liked successfully",
      like,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// Unlike post controller

async function unlikePostController(req, res) {
  try {
    const username = req.user.username;
    const postId = req.params.postId;

    // check if post exist or not
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // check if like exist or not
    const existingLike = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (!existingLike) {
      return res.status(404).json({
        message: "You have not liked this post",
      });
    }

    // delete the like
    await likeModel.findByIdAndDelete(existingLike._id);

    return res.status(200).json({
      message: "Post unliked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
};
