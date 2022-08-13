var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // cookie-parser用法
  console.log(req.cookies);
  res.cookie("test2", 2222);
  res.send("respond with a resource");
});

module.exports = router;
