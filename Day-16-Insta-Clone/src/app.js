const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

//require routes
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/posts.routes");
const userRouter = require("./routes/user.routes")


app.use(express.json());
app.use(cookieParser());

//using routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users",userRouter)

module.exports = app;
