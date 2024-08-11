// Entry Point of the application
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// Middlewares
const notFound = require("./app/middlewares/notFound");
const errorHandler = require("./app/middlewares/errorHandler");

// Routes
const authRouter = require("./app/api/v1/auth/router");
const userRefreshTokenRouter = require("./app/api/v1/userRefreshToken/router");
const postsRouter = require("./app/api/v1/posts/router");

const app = express();
const v1 = "/api/v1";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Prisma API",
  });
});

app.use(`${v1}/auth`, authRouter);
app.use(`${v1}`, userRefreshTokenRouter);
app.use(`${v1}/posts`, postsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
