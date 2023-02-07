import { HashRouter } from "react-router-dom";

import AppRoutes from "./router";
import TabBar from "./components/TabBar";

import "./App.css";

export default function App() {
  return (
    <div className="setup">
      <HashRouter>
        <AppRoutes></AppRoutes>
        <TabBar></TabBar>
      </HashRouter>
    </div>
  );
}
