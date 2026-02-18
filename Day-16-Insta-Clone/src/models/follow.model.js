const mongoose = require("mongoose");

// Schema creation

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Follower is required"],
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Followee is required"],
    },
  },
  {
    timestamps: true,  //tell when db created
  },
);

// model

const followModel = mongoose.model("Follow", followSchema);
