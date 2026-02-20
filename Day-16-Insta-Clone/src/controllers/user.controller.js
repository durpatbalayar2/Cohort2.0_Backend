const followModel = require("../models/follow.model");
const userModel = require("../models/users.model");

/**
 * @desc    Follow a user
 * @route   POST /api/follow/:username
 * @access  Private (Only logged-in users)
 *
 * This controller:
 * 1. Prevents a user from following themselves
 * 2. Checks if the target user exists
 * 3. Prevents duplicate follow records
 * 4. Creates a follow relationship if valid
 */

async function followUserController(req, res) {
  try {
    // Extract logged-in user's username from auth middleware
    const followerUsername = req.user.username;

    // Extract target username from route params
    const followeeUsername = req.params.username;

    // 1️⃣ Prevent user from following themselves
    if (followeeUsername === followerUsername) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    // 2️⃣ Check if the target user exists in the database
    const isFolloweeExist = await userModel.findOne({
      username: followeeUsername,
    });

    if (!isFolloweeExist) {
      return res.status(404).json({
        message: "The user you are trying to follow does not exist",
      });
    }

    // 3️⃣ Check if already following (avoid duplicate follow records)
    const isAlreadyFollowing = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
      return res.status(409).json({
        message: `You are already following ${followeeUsername}`,
        follow: isAlreadyFollowing,
      });
    }

    // 4️⃣ Create follow relationship
    const followRecord = await followModel.create({
      follower: followerUsername,
      followee: followeeUsername,
    });

    // 5️⃣ Send success response
    return res.status(201).json({
      message: `You are now following ${followeeUsername}`,
      follow: followRecord,
    });
  } catch (error) {
    // Handle unexpected server errors
    console.error("Follow User Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = { followUserController };
