const mongoose = require("mongoose");

// Schema creation

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "post id is required for creating like"],
    },
    user: {
      type: String,
      required: [true, "user is required for creating like"],
    },
  },
  { timestamps: true },
);

//ek user ek post ek bar like kar sakta hai
likeSchema.index({ post: 1, user: 1 }, { unique: true });

// model

const likeModel = mongoose.model("Like", likeSchema);

module.exports = likeModel;
