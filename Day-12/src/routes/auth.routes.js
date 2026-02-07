const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const appRouter = express.Router();

appRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check whether the user email already exist or not
  const isUserExist = await userModel.findOne({ email });

  if (isUserExist)
    return res.status(409).json({ message: "User already existed" });

  // New User created
  const user = await userModel.create({
    name,
    email,
    password,
  });

  // Token created

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
  );

  // store JWT in cookie

  res.cookie("jwt_token", token);

  res
    .status(201)
    .json({ message: "user registered successfully", user, token });
});

module.exports = appRouter;
