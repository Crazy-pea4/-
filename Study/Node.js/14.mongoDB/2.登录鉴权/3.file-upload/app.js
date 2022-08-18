const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// 引入jsonwebtoken
const JWT = require("./utils/jwt");

require("./mongodb.config");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const uploadRouter = require("./routes/upload");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// 校验token
app.use((req, res, next) => {
  // 排除login，不需要校验token
  if (req.url.includes("login")) {
    next();
  } else {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      if (JWT.verify(token)) {
        const recountToken = JWT.sign(JWT.verify(token).data, "7days");
        res.header("Authorization", recountToken);
        next();
      } else {
        res.status(401).send({ message: "error" });
      }
    } else {
      next();
    }
  }
});

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // 渲染模板的第二种写法，相当于在下面的render中协商第二个参数 { message: xxx, error: xxx }
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8080, () => {
  console.log("由express生成器生成");
});

module.exports = app;
