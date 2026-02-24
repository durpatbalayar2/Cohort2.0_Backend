const mongoose = require("mongoose");

// Edge Collection Used to make a relationship between two collections (User and Post)

// likeSchema

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "post id  is required for creating like"],
    },
    user: {
      type: String,
      required: [true, "User is required for creating like"],
    },
  },
  {
    timestamps: true,
  },
);

// To ensure that a user cannot like the same post multiple times
likeSchema.index({ post: 1, user: 1 }, { unique: true });

// likeModel

const likeModel = mongoose.model("Like", likeSchema);

module.exports = likeModel;
