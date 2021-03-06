import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import mongoose from "mongoose";
const dbConn = mongoose.connection;

dbConn.once("open", () => {
  console.log("MongoDB Open OK :)");
});

dbConn.on("error", (err) => {
  console.error(err);
});

mongoose.connect("mongodb://localhost/go-data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import bisRouter from "./routes/bisRouter.js";

const app = express();

// view engine setup
app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("./public")));

import { justExec, bis_Schedule } from "./models/Station-schedule.js";
// justExec();
bis_Schedule();

app.use("/", indexRouter);
app.use("/users", usersRouter);

// localhost:3000/bis/* 로 요청이 오면 bisRouter한테 전달하라!
app.use("/bis", bisRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// commonJS 문법
// module.exports = app;

// ES6 문법
export default app;
