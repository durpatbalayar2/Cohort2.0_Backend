const mongoose = require("mongoose");

// UserSchema creation

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // This will prevent password from being returned in any query results by default
  }, 
  // We will use select: false for password field to avoid sending password in response when we use populate to get user details in post details response. But this will create problem when user try to login then we cannot get password from DB to compare with password sent by user in login request. So to solve this problem we can use select("+password") in login controller when we are fetching user details from DB to get password in login controller for comparing with password sent by user in login request.
  bio: String,

  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
});

// Model creation

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
