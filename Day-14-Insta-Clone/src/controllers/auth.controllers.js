const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  //1. Check is user alreaday exist in db - username/email
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExist)
    return res.status(409).json({
      message:
        "User is already exist" + (isUserAlreadyExist == email)
          ? "Email already exist"
          : "Username already exist",
    });

  //2. Create hash password
  const hashpassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  //3. Create user
  const user = await userModel.create({
    username,
    email,
    password: hashpassword,
    bio,
    profileImage,
  });

  //4. Generate token

  //user ka data hona chaiye wor unique hona chahiye -id

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //5.Store the token in cookie

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User registered  successfully",
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

  // We logged in the user on the basis of:

  // username/password
  //email/password

  //1. Check username/email
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  //2. Check password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const validPassword = hashedPassword == user.password;

  if (!validPassword)
    return res.status(404).json({ message: "Invalid Password" });

  //3. Generate token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //4. Store token in cookie

  res.cookie("new_token", token);

  res.status(200).json({
    message: "User successfully loggedIn",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = { registerController,loginController };
