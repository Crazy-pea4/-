export default {
  // app端口
  app: {
    port: process.env.PORT || 3000,
  },
  // 数据库url
  database: {
    url: process.env.MONGODB || "mongodb://localhost:27017/Blog",
  },
  // jwt密钥
  secret: "e43c830d-687c-5850-8393-94d9d59d3bef-ym",
};
