export default function () {
  return `import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./router/index";
    
export default function App() {
    
  return (
    <HashRouter>
      <AppRoutes></AppRoutes>
    </HashRouter>
  )
}`;
}
