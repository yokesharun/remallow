#!/usr/bin/env node
require("colors");
const { execSync } = require("child_process");
const { initializeStaticRoutes } = require("../static-files");
const { appRoutes } = require("../routes");
const parseArgs = require("minimist");

const currentFolder = process.cwd();
const args = parseArgs(process.argv);

if (args.test) {
  console.log("Remallow installed successfully...".blue);
  console.log("Type: remallow to start the application".blue);
  process.exit();
}

const getPackage = (res) => {
  var fs = require("fs"),
    path = require("path"),
    filePath = path.join(currentFolder, "package.json");
  fs.readFile(filePath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:".red, err);
      res.status(500).send({
        success: false,
        message: "unable to load package.json",
      });
      return;
    }
    const stdout = execSync(`npm list --depth=0 --json=true`).toString();
    res.send({
      success: true,
      raw: JSON.parse(jsonString),
      json: JSON.parse(stdout),
      currentFolder,
    });
  });
};

(function init() {
  try {
    const ChromeLauncher = require("chrome-launcher");
    var express = require("express");
    var app = express();
    initializeStaticRoutes(app);
    appRoutes({
      app,
      getPackage,
    });

    app.listen(8081, function () {
      var host = "http://127.0.0.1";
      var port = "8081";
      console.log("listening at %s:%s".magenta, host, port);
    });

    ChromeLauncher.launch({
      startingUrl: "http://127.0.0.1:8081",
    }).then((chrome) => {
      console.log(
        `Remallow Package Manager running on http://127.0.0.1:8081`.green
      );
    });
  } catch (e) {
    console.error(e);
  }
})();
