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
 * POST/api/users/unfollow/userId
 * @desc    Unfollow a user
 * @route   POST /api/follow/:username
 * @access  Private (Only logged-in users)
 
 */

userRouter.post(
  "/unfollow/:username",
  userIdentify,
  userController.unfollowUserController,
);

module.exports = userRouter;
