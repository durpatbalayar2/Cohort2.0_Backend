const mongoose = require("mongoose");

// Create user schema

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "With this email, user already exist"],
  },
  password: String,
});

// Model Created
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
