const https = require("https");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

let result = "";
let number = 56;

const options = {
  hostname: "xxx",
  port: 80,
  path: "/upload",
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const req = https.request(options, (res) => {
  res
    .on("data", (data) => {
      result += data;
    })
    .on("end", () => {
      console.log(result);
    });
});

const img = fs.readFileSync(path.join(__dirname, "./asset/spongebob.jpg"));
const file = new FormData();
file.append("img", img);
file.append("number", number);

req.write(JSON.stringify(file));
req.end();
