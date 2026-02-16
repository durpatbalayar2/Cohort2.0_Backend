const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/posts.routes");
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

module.exports = app;
