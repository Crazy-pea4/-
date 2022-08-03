const EventEmitter = require("events");

const e = new EventEmitter();

e.on("message", function (p) {
  console.log("this is a message" + "this is params：" + p);
});

e.emit("message", 111);
