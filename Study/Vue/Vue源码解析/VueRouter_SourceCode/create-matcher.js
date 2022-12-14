import createRouteMap from "./create-route-map";

export default function createMatcher(routes) {
  let { routeMap } = createRouteMap(routes);
  console.log(routeMap, 111);

  function addRoutes(routes) {
    createRouteMap(routes, routeMap);
  }

  function addRoute(route) {
    createRouteMap([route], routeMap);
  }

  function match(location) {
    return routeMap[location];
  }

  return {
    addRoutes,
    addRoute,
    match,
  };
}
