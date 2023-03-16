import chalk from "chalk";

const log = console.log;

export const error = (errorMessage) => {
  log(chalk.red(errorMessage));
};

export const message = (message) => {
  log(chalk.yellow(message));
};
