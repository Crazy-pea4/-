const fs = require("fs");

const rs = fs.createReadStream("./a.txt");
const ws = fs.createWriteStream("./b.txt");

rs.pipe(ws);
