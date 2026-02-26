const followModel = require("../models/follow.model");
const userModel = require("../models/users.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username; // Get follower's username from req.user set by auth middleware (logged-in user)
  const followeeUsername = req.params.username; // Get followee's username from URL parameters

  //1. Check if the logged-in user is trying to follow himself/herself

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  //2. Check if the targeted followee user exist or not

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "The user you are trying to follow does not exist",
    });
  }

  //3. check if the logged-in user is already following the targeted followee

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    // If already accepted

    if (isAlreadyFollowing.status === "accepted") {
      return res.status(409).json({
        message: `You are already following ${followeeUsername}`,
      });
    }

    // If request is pending

    if (isAlreadyFollowing.status === "pending") {
      return res.status(409).json({
        message: `Your follow request to ${followeeUsername} is still pending`,
      });
    }

    // If  previously rejected then we can update the status to pending again

    if (isAlreadyFollowing.status === "rejected") {
      isAlreadyFollowing.status = "pending";
      await isAlreadyFollowing.save();

      return res.status(200).json({
        message: `Your follow request to ${followeeUsername} has been sent again and is pending approval`,
        follow: isAlreadyFollowing,
      });
    }
  }

  //4. If no record exists then create a new follow record with status pending

  const followCollection = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,

    // By default, the status will be set to "pending" as defined in the followSchema
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
    return res.status(404).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  //If they are following then delete the follow record
  await followModel.findByIdAndDelete(isFollowing._id);

  // Different message based on status
  if (isFollowing.status === "pending") {
    return res.status(200).json({
      message: `Follow request to ${followeeUsername} has been cancelled`,
    });
  }

  // Send the response

  if (isFollowing.status === "accepted") {
    return res.status(200).json({
      message: `You have unfollowed ${followeeUsername}`,
    });
  }
}

async function acceptFollowController(req, res) {
  try {
    const followeeUsername = req.user.username; // logged-in user
    const followerUsername = req.params.username; // who sent request

    // 1️⃣ Check if pending follow request exists

    const followRequest = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
      status: "pending",
    });

    if (!followRequest) {
      return res.status(404).json({
        message: `No pending follow request from ${followerUsername}`,
      });
    }

    // 2️⃣ Update status to accepted

    followRequest.status = "accepted";
    await followRequest.save();

    // 3️⃣ Send success response

    res.status(200).json({
      message: `${followerUsername} is now following you`,
      follow: followRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function rejectFollowController(req, res) {
  try {
    const followeeUsername = req.user.username; // logged-in user
    const followerUsername = req.params.username; // who sent request

    // 1️⃣ Check if pending request exists

    const followRequest = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
      status: "pending",
    });

    if (!followRequest) {
      return res.status(404).json({
        message: `No pending follow request from ${followerUsername}`,
      });
    }

    // 2️⃣ Delete follow request

    await followModel.findByIdAndDelete(followRequest._id);

    // 3️⃣ Send response

    res.status(200).json({
      message: `Follow request from ${followerUsername} has been rejected`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowController,
  rejectFollowController,
};
