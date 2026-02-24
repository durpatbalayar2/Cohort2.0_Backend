const followModel = require("../models/follow.model");
const userModel = require("../models/users.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username; // Get follower's username from req.user set by auth middleware (logged-in user)

  const followeeUsername = req.params.username; // Get followee's username from URL parameters

  //1. Check if the targeted followee user exist or not

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "The user you are trying to follow does not exist",
    });
  }

  //2. Check if the logged-in user is trying to follow himself/herself

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  //3. check if the logged-in user is already following the targeted followee

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(409).json({
      message: `You are already following ${followeeUsername}`,
    });
  }

  //4. If all the above validations are passed then create a new follow record

  const followCollection = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  //5. Send the response

  res.status(200).json({
    message: `You are now following ${followeeUsername}`,
    follow: followCollection,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username; // token bata aako (logged-in user)
  const followeeUsername = req.params.username; // URL ko parameter bata aako

  // Check Userfollowing each other or not

  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isFollowing) {
    return res.status(400).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  //If they are following then delete the follow record
  await followModel.findByIdAndDelete(isFollowing._id);

  // Send the response
  
  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
};
