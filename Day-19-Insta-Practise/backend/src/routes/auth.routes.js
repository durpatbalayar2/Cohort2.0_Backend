const express = require("express");
const authController = require("../controllers/auth.controller");

const { userIdentify } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 *  @route POST / api/auth/register
 *  @desc Register a user
 *  @access Public
 *
 */

authRouter.post("/register", authController.registerController);

/**
 * @route POST / api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginController);

/**
 * @route POST /api/auth/get-me
 * @desc Get the current logged in user information
 * @access Private
 */
authRouter.get("/get-me", userIdentify, authController.getMeController);

module.exports = authRouter;
