const fs = require("fs");

// stream流读取文件（适用于读取大文件。分流读取）
// const rs = fs.createReadStream("./a.txt", { encoding: "utf-8" });
// rs.on("data", (chunk) => console.log("chunk--", chunk));
// rs.on("end", () => console.log("读取结束", i));
// rs.on("error", (err) => console.log(err));

// stream流读取文件（适用于读取大文件。分流读取）
const ws = fs.createWriteStream("./b.txt", { encoding: "utf-8" });
ws.write("i am robot!");
ws.write("he is robot!");
ws.write("she is robot!");

ws.end();
