import fs from "fs";
import { currentRootPath } from "../bin/thunder-react-app.js";
import { error } from "../bin/log.js";
import {
  write_root,
  write_src,
  write_src_views,
  write_src_router,
  write_indexJs,
  write_src_store,
  write_src_scc,
} from "../bin/write.js";

export function checkProjectNameExists(projectName) {
  return projectName ? true : false;
}

export function checkProjectDirExists(projectName) {
  return fs.existsSync(currentRootPath + `/${projectName}`);
}

let rootPath = "";

function createDir(projectName) {
  const path = currentRootPath + `/${projectName}`;
  try {
    fs.mkdirSync(path);
    // redirect rootPath to /projectName dir
    rootPath += path;
    return true;
  } catch (err) {
    error(err.message);
    return false;
  }
}

function initialWrite(projectName) {
  try {
    write_root({ projectName });
    fs.mkdirSync(rootPath + "/src");
    write_src();
    fs.mkdirSync(rootPath + "/src" + "/views");
    write_src_views();
    fs.mkdirSync(rootPath + "/src" + "/router");
    write_src_router();
    fs.mkdirSync(rootPath + "/src" + "/store");
    fs.mkdirSync(rootPath + "/src" + "/store" + "/reducer");
    write_src_store();
    fs.mkdirSync(rootPath + "/src" + "/css");
    write_src_scc();

    return true;
  } catch (err) {
    error(err.message);
    return false;
  }
}

export const createSimpleTemplate = function (type, projectName) {
  console.log(rootPath);
  if (!createDir(projectName)) return;
  if (!initialWrite(projectName)) return;
  else
    switch (type) {
      case "js":
        write_indexJs();
        break;
      case "ts":
        break;
    }
};

export const createCustomizeTemplate = function (
  type,
  { projectName, store, async, ui }
) {
  if (!initialWrite(projectName)) return;
  else
    switch (type) {
      case "js":
        write_indexJs();
        break;
      case "ts":
        break;
    }
};
