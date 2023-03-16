export default function () {
  return `import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";

export default function AppRoutes() {
  return useRoutes(routes);
}`;
}
