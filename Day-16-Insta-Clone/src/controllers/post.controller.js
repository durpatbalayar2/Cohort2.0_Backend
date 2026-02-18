const postModel = require("../models/posts.model");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

// Initialize ImageKit
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

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

async function getPostController(req, res) {
  //Data from middleware
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({ message: "Post Fetched Successfully", posts });
}

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

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
