const postModel = require("../models/posts.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const jwt = require("jsonwebtoken");

//ImageKit initialize
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  // Logic for post creation we need caption, imgURL and userID from token

  // So we will get the token from cookie and verify it to get the userID and then we will create a post with the caption, imgURL and userID

  const token = req.cookies.jwt_token;

  

  //if user is not logged in / not registered then token will not be there in cookie so we will send error message

  if (!token) {
    return res
      .status(401)
      .json({ message: " Token not provided, Unauthorized access" });
  }

  // if token is there then we will verify it to get the userID

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token, Unauthorized access" });
  }

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({ message: "Post created successfully", post });
}

module.exports = { createPostController };
