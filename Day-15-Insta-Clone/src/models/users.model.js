const mongoose = require("mongoose");

// Schema Create

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "With this username is already exist"],
    required: [true, "username is required"],
  },

  email: {
    type: String,
    unique: [true, "With this email is already exist"],
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

// Model Create

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
