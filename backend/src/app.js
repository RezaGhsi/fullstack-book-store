const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const bookRouter = require("./modules/v1/books/book.routes");
const userRouter = require("./modules/v1/users/user.routes");
const authRouter = require("./modules/v1/auth/auth.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  if (!err) return next();

  console.error(err);
  return res
    .status(err.status || 500)
    .json({ error: err.message || "Server Error!!" });
});

module.exports = app;
