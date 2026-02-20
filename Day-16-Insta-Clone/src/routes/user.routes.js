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

module.exports = userRouter;
