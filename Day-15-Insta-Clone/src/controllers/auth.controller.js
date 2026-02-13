const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  //1. Check if username or email already exists
  const userAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExist)
    return res.status(409).json({
      message:
        userAlreadyExist.email === email
          ? "Email already exist"
          : "Username already exist",
    });

  // 2.  Hash the password
  const hashPass = await bcrypt.hash(password, 10);

  //3. Create new user in database
  const user = await userModel.create({
    username,
    email,
    password: hashPass,
    bio,
    profileImage,
  });

  //4.Generate JWT token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //5. Store token in cookie
  res.cookie("jwt_token", token);

  //6.Send success response

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  // User can login either -> username/password or email/password

  //1. Check email/username is exist in db or not ?

  const user = await userModel.findOne({
    $or: [
      {
        username,
      },
      { email },
    ],
  });

  if (!user) return res.status(404).json({ message: "user not found" });

  // 2. Check the password
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid)
    return res.status(401).json({ message: "Invalid Password" });

  //3. Generate a new token

  const new_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //4.Store the token in cookie

  res.cookie("jwt_token", new_token);

  //5. send the response

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
