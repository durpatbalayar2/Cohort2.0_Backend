const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register controller
async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  //1.Check user already exist or not

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist)
    return res.status(409).json({
      message:
        isUserAlreadyExist.email === email
          ? "Email is already exist"
          : "Username is already exist",
    });

  //2. Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  //3. create new user

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    bio,
    profileImage,
  });

  //4. Generate a token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  //5. Store the token in cookie
  res.cookie("token", token);

  //6. Response send

  res.status(201).json({
    message: "New user registered",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

//Login controller

async function loginController(req, res) {
  //For login we need email, username & password
  // Our user can login with email/password or username/password
  const { username, email, password } = req.body;

  //1. Check whether the user exist or not
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  //2. Valid the password
  const validatePass = await bcrypt.compare(password, user.password);

  if (!validatePass)
    return res.status(401).json({ message: "Invalid password" });

  //3. Generate a token
  const new_token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  //4. Store the token in cookie
  res.cookie("token", new_token);

  // 5. response send

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
