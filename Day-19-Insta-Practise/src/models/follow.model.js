/**
 * Follow Model
 * Edge Collection ka use krte hai
 * To make a relationship between two collections (User and Post)
 * Follower -> user jo follow kr raha hai (logged-in user)
 * Followee -> user jise follow kiya ja raha hai
 */

const mongoose = require("mongoose");

// followSchema
const followSchema = new mongoose.Schema({
  follower: String,
  followee: String,
},{
    timestamps:true
});

// To ensure that a user cannot follow the same user multiple times
followSchema.index({ follower: 1, followee: 1 }, { unique: true });

// followModel
const followModel = mongoose.model("Follow", followSchema);

module.exports = followModel;