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

  //1. Check user exist or not

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //2. Validate the password
  //bcrypt.compare(plainPassword, hashedPassword)
  
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  //3. Generate a new token to login

  const new_token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  //4. Store the token in cookie storage
  res.cookie("token", new_token);

  //5. Send the respone

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

module.exports = { registerController, loginController };
