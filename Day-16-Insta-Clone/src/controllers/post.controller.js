const postModel = require("../models/posts.model");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

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

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  

  // If token exist 
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id,
    });

    res.status(201).json({
        message: "Post created successfully",
        post,
    });
}

module.exports = { createPostController };
