function parse(res, data, status) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.write(data);
  res.end();
}

module.exports = {
  "/api/login": (req, res) => {
    let post = "";
    req.on("data", (chunk) => {
      post += chunk;
    });
    req.on("end", () => {
      post = JSON.parse(post);
      console.log(post);
      parse(res, `{"ok": "1111111"}`, 200);
    });
  },
  "/api/home": (req, res) => {
    parse(res, {}, 200);
  },
};
