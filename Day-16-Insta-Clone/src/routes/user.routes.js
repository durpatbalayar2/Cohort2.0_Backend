const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user.controller");

const userIdentify = require("../middlewares/auth.middleware");

// POST/api/users/follow/:username

userRouter.post(
  "/follow/:username",
  userIdentify,
  userController.followUserController,
);


/**
 * @desc    Unfollow a user
 * @route   POST /api/follow/:username
 * @access  Private (Only logged-in users)
 * This controller:
 * 1. Prevents a user from unfollowing themselves
 * 2. Checks if the target user exists
 * 3. Checks if the follow relationship exists before trying to delete it
 * 4. Deletes the follow relationship if valid
 */

userRouter.post(
  "/unfollow/:username",
  userIdentify,
  userController.unfollowUserController,
);

module.exports = userRouter;
