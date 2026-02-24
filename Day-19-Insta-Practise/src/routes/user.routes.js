const express = require("express");
const userController = require("../controllers/user.controller");
const { userIdentify } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:username
 * @desc Follow a user
 * @access Protected
 *
 * username will be sent as a URL parameter. We can access it in the controller using req.params.username
 */

userRouter.post(
  "/follow/:username",
  userIdentify,
  userController.followUserController,
);

/**
 * @route POST /api/users/unfollow/:username
 * @desc Unfollow a user
 * @access Protected
 */

userRouter.post(
  "/unfollow/:username",
  userIdentify,
  userController.unfollowUserController,
);

module.exports = userRouter;
