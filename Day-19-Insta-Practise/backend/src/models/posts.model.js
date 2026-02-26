const mongoose = require("mongoose");

//Create postSchema

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgURL: {
    type: String,
    required: [true, "Image URL is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

// Create postModel

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
