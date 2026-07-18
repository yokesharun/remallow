#!/usr/bin/env node
const chalk = require("chalk");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const { initializeStaticRoutes } = require("../static-files");
const { appRoutes } = require("../routes");
const parseArgs = require("minimist");

const currentFolder = process.cwd();
const args = parseArgs(process.argv);

if (args.test) {
  console.log(chalk.blue("Remallow installed successfully..."));
  console.log(chalk.blue("Type: remallow to start the application"));
  process.exit();
}

const getPackage = (res) => {
  const filePath = path.join(currentFolder, "package.json");
  fs.readFile(filePath, "utf8", (err, jsonString) => {
    if (err) {
      console.log(chalk.red("File read failed:"), err);
      res.status(500).send({
        success: false,
        message: "unable to load package.json",
      });
      return;
    }
    let outdated = "{}";
    try {
      outdated = execSync("npm outdated --json", { timeout: 30000 }).toString();
    } catch (error) {
      if (error.stdout) {
        outdated = error.stdout.toString();
      }
    }
    res.send({
      success: true,
      raw: JSON.parse(jsonString),
      outdated: JSON.parse(outdated || "{}"),
      currentFolder,
    });
  });
};

(async function init() {
  try {
    const open = require("open");
    const express = require("express");
    const app = express();

    app.use(express.json());
    initializeStaticRoutes(app);
    appRoutes({ app, getPackage });

    const port = args.port || process.env.PORT || 8081;
    const host = "http://127.0.0.1";

    app.listen(port, function () {
      console.log(chalk.magenta(`listening at ${host}:${port}`));
    });

    await open(`${host}:${port}`);
    console.log(chalk.green(`Remallow Package Manager running on ${host}:${port}`));
  } catch (e) {
    console.error(e);
  }
})();
