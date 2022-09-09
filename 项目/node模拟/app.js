const http = require("http");
const fs = require("fs");
const FormData = require("form-data");
const request = require("request");
const path = require("path");

let result = "";
let number = 100;

const req = request.post(
  "http://pf5x79.natappfree.cc/getShrimpData",
  function (err, res, body) {
    if (err) {
      console.log("Error!");
    } else {
      console.log("URL: " + body);
    }
  }
);
const form = req.form();
form.append(
  "img",
  // fs.readFileSync(path.join(__dirname, "./asset/spongebob.jpg")),
  fs.createReadStream(path.join(__dirname, "./asset/spongebob.jpg")),
  {
    contentType: "multipart/form-data",
  }
);
form.append("number", number);

// http://f4tmi8.natappfree.cc/toReceiveAndPressSave
// http://ewxuas.natappfree.cc
// http://pf5x79.natappfree.cc
// const options = {
//   hostname: "pf5x79.natappfree.cc",
//   port: 80,
//   path: "/toReceiveAndPressSave",
//   method: "POST",
//   // headers: {
//   //   "Content-Type": "application/json",
//   // },
// };
// const req = http
//   .request(options, (res) => {
//     res
//       .on("data", (data) => {
//         result += data;
//       })
//       .on("end", () => {
//         console.log("111", result);
//       });
//   })
//   .on("error", (err) => {
//     console.log(err);
//   });

// const file = new FormData();
// const img = fs.createReadStream(path.join(__dirname, "./asset/spongebob.jpg"));
// file.append("contentType", "multipart/form-data");
// file.append("img", img);
// file.append("number", number);

// req.write(JSON.stringify(file));
// req.end();
