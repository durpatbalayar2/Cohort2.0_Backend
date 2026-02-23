// Server create krne ka code

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
const authRouter = require("./routes/auth.routes");

// Use Routes
app.use("/api/auth", authRouter);

module.exports = app;
