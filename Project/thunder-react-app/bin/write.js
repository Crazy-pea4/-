import fs from "fs";
import { message } from "../bin/log.js";

import { currentRootPath, projectName } from "./thunder-react-app.js";

import pkgJSON from "../template/slice/pkgJSON.js";
import html from "../template/slice/html.js";
import config from "../template/slice/config.js";
import indexJs from "../template/slice/src/indexJs.js";
import css from "../template/slice/src/css.js";
import app from "../template/slice/src/app.js";
import router from "../template/slice/src/router/index.js";
import routes from "../template/slice/src/router/routes.js";
import Home from "../template/slice/src/views/Home.js";
import Introducing from "../template/slice/src/views/Introducing.js";
import NotFound from "../template/slice/src/views/NotFound.js";
import store from "../template/slice/src/store/index.js";
import reducer from "../template/slice/src/store/reducer/userReducer.js";
import Homecss from "../template/slice/src/css/Homecss.js";

import gitignore from "../template/slice/gitignore.js";

function writeFile(path, data) {
  fs.writeFile(currentRootPath + `/${projectName}` + path, data, (err) => {
    if (err) throw Error(err.message);
  });
}

export const write_root = async function ({ projectName = "my-app" }) {
  const html_data = html();
  const config_data = config();
  const gitignore_data = gitignore();
  writeFile("/index.html", html_data);
  writeFile("/vite.config.js", config_data);
  writeFile("/.gitignore", gitignore_data);
  const pkgJSON_data = await pkgJSON({ projectName });
  writeFile("/package.json", pkgJSON_data);
  message(`
  cd ${projectName}
  npm i
  then use 'npm run dev'
  `);
};

export const write_src = function () {
  const css_data = css();
  const app_data = app();
  writeFile("/src/index.css", css_data);
  writeFile("/src/App.jsx", app_data);
};

export const write_indexJs = function () {
  const indexJs_data = indexJs();
  writeFile("/src/main.jsx", indexJs_data);
};

export const write_src_views = function () {
  const Home_data = Home();
  const Introducing_data = Introducing();
  const NotFound_data = NotFound();
  writeFile("/src/views/Home.jsx", Home_data);
  writeFile("/src/views/Introducing.jsx", Introducing_data);
  writeFile("/src/views/NotFound.jsx", NotFound_data);
};

export const write_src_router = function () {
  const router_data = router();
  const routes_data = routes();
  writeFile("/src/router/index.jsx", router_data);
  writeFile("/src/router/routes.jsx", routes_data);
};

export const write_src_store = function () {
  const store_data = store();
  const reducer_data = reducer();
  writeFile("/src/store/index.jsx", store_data);
  writeFile("/src/store/reducer/userReducer.jsx", reducer_data);
};

export const write_src_scc = function () {
  const css_data = Homecss();
  writeFile("/src/css/Home.module.css", css_data);
};
