const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// 引入session模块
const session = require("express-session");
// 引入connect-mongo模块
const MongoStore = require("connect-mongo");

require("./mongodb.config");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 注册session中间件
app.use(
  session({
    name: "yarh",
    secret: "luandade",
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false, // true为只能通过https获取
    },
    resave: true, // 当重新设置session后（内部修改也行），重置过期时间
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/project_session",
      // 过期时间
      ttl: 1000 * 60 * 10,
    }),
  })
);

// 设置session过期校验中间件
app.use((req, res, next) => {
  if (req.session.user) {
    // 添加时间戳，更改一下session的内部配置，让resave生效u
    req.session.date = new Date();
    next();
  } else if (req.url.includes("login")) {
    next();
  } else {
    if (req.url.includes("api")) {
      res.status(404).send({ message: "error" });
    } else {
      res.redirect("/login");
    }
  }
});

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/login", loginRouter);

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
