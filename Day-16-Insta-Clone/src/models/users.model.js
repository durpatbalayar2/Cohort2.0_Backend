const mongoose = require("mongoose");

// User Schema creation

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "With this username is already exist"],
  },

  email: {
    type: String,
    unique: [true, "With this email , user already exist"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
});

// User Model

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
