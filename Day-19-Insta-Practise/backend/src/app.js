// Server create krne ka code

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
const authRouter = require("../src/routes/auth.routes");
const postRouter = require("../src/routes/post.routes");
const userRouter = require("../src/routes/user.routes");

// Use Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
