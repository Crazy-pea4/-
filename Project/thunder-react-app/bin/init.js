import inquirer from "inquirer";
import { program } from "commander";
import { error, message } from "./log.js";

import {
  createSimpleTemplate,
  createCustomizeTemplate,
  checkProjectNameExists,
  checkProjectDirExists,
} from "../template/index.js";

import question from "../question/index.js";
const {
  topLevel,
  simpleQuestion,
  customizeQuestion_for_store,
  customizeQuestion_for_async,
  customizeQuestion_for_ui,
} = question;

export default function init(projectName) {
  if (!checkProjectNameExists(projectName)) {
    error(
      "least provide one params as projectName like 'thunder-react-app my-app'"
    );
    return;
  }
  if (checkProjectDirExists(projectName)) {
    error(`${projectName} dir is already exists`);
    return;
  }
  inquirer.prompt(topLevel).then(({ choose }) => {
    switch (choose) {
      case "simple":
        inquirer.prompt(simpleQuestion).then(({ isJs }) => {
          if (isJs) {
            createSimpleTemplate("js", projectName);
          } else {
            createSimpleTemplate("ts", projectName);
          }
        });
        break;
      case "customize":
        let obj = {
          projectName,
          store: "",
          async: "",
          ui: "",
        };
        inquirer
          .prompt(customizeQuestion_for_store)
          .then(({ select_for_store }) => {
            store = select_for_store;
          });
        inquirer
          .prompt(customizeQuestion_for_async)
          .then(({ select_for_async }) => {
            async = select_for_async;
          });
        inquirer.prompt(customizeQuestion_for_ui).then(({ select_for_ui }) => {
          ui = select_for_ui;
        });
        createCustomizeTemplate("type", obj);
        break;
    }
  });
}
