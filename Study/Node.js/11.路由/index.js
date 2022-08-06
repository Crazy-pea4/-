const getRoute = require("./routes");
const getApi = require("./api");
const { startServer, useRoute } = require("./server");
// 设计思想，为了方便以后增删路由
useRoute(getRoute);
useRoute(getApi);
startServer();
