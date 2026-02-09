const express = require("express");
const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

// New Registeration

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // 1.Check either email aready exist ot not

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res
      .status(409)
      .json({ message: "User already exist with this email" });
  }

  const hashPassword = crypto.createHash("md5").update(password).digest("hex");

  //2. If not exist, create new user

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  //3. Generate the token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  //4. Store the jwt token in cookie
  res.cookie("jwt_tokwn", token);

  res.status(201).json({ message: "New user registerd", user, token });
});

authRouter.get("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({ message: "Cookie fetch successfully" });
});

// Login

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //1. Check user is registerd or not
  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "user not found" });

  //2. Check the password
  const isPasswordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatch)
    return res.status(401).json({ message: "Invalid Password !" });

  //3. If email & password Ok , generate new token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  //4. Store the cookie
  res.cookie("new_token", token);

  //5. Send the response
  res.status(200).json({ message: "User logged in successfully", user });
});

module.exports = authRouter;
