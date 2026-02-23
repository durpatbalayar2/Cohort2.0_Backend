const userModel = require("../models/users.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  //Check user already exist or not

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        isUserAlreadyExist.email === email
          ? "User with this email is already exist"
          : "User with this username is already exist",
    });
  }

  // Hash the password
  const hashPass = await bcrypt.hash(password, 10);

  // Register the new user
  const user = await userModel.create({
    username,
    email,
    password: hashPass,
    bio,
    profileImage,
  });

  // Generate the token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // Store the token in cookies
  res.cookie("token", token);

  // Send the response

  res.status(201).json({
    message: "New user successfully register",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  // We can login through -> username/password or email/password

  const { username, email, password } = req.body;
}

module.exports = { registerController, loginController };
