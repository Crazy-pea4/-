function addRouteToMap(route, routeMap, parentRecord) {
  // 如果当前route不存在与routeMap中，才放入路由映射表
  let path = parentRecord
    ? `${parentRecord.path === "/" ? "" : parentRecord.path}/${route.path}`
    : route.path;
  let record = {
    path: path,
    component: route.component,
    parent: parentRecord,
  };

  if (!routeMap[path]) {
    routeMap[path] = record;
  }
  // 处理子路由（递归）
  route.children &&
    route.children.map((childrenRoute) => {
      addRouteToMap(childrenRoute, routeMap, record);
    });
}

export default function createRouteMap(routes, routeMap) {
  routeMap = routeMap || {};
  routes.map((route) => {
    addRouteToMap(route, routeMap);
  });
  return {
    routeMap,
  };
}
