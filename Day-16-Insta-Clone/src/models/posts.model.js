const mongoose = require("mongoose");

// Create postSchema

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },

  imgUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: [true, "user id is required"],
  },
});

// Create postModel
const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
