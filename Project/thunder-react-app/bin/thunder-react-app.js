#! /usr/bin/env node
import init from "./init.js";

export const currentRootPath = process.cwd();

// 获取项目名
export const projectName = process.argv[2];

init(projectName);
