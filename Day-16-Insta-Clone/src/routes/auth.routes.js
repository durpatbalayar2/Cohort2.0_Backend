const express = require("express");

const authController = require("../controllers/auth.controller")

// authRoute define
const authRouter = express.Router();

//Register api 
//POST -api/auth/register
authRouter.post("/register",authController.registerController)

//Login api
//POST -api/auth/login

authRouter.post("/login",authController.loginController)

module.exports = authRouter;
