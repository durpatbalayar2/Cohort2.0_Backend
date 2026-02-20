const mongoose = require("mongoose");

// Schema creation

const followSchema = new mongoose.Schema(
  {
    follower: String,
    followee: String,
  },
  { timestamps: true },
);

// model

const followModel = mongoose.model("Follow", followSchema);

module.exports = followModel;
