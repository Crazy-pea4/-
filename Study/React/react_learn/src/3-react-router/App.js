import { HashRouter } from "react-router-dom";

import AppRoutes from "./router/06-useRoutes";
import TabBar from "./components/TabBar";

export default function App() {
  return (
    <HashRouter>
      <AppRoutes></AppRoutes>
      <TabBar></TabBar>
    </HashRouter>
  );
}
