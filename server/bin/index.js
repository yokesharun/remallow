#!/usr/bin/env node

const colors = require("colors");
const { exec, execSync } = require("child_process");
const { cleanup } = require("../utils/helper");
const { initializeStaticRoutes } = require("../static-files");

const currentFolder = process.cwd();

const ChromeLauncher = require("chrome-launcher");

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
    const stdout = execSync(`npm list --json=true`).toString();
    res.send({
      success: true,
      raw: JSON.parse(jsonString),
      json: JSON.parse(stdout),
      currentFolder,
    });
  });
};

var express = require("express");
var app = express();
initializeStaticRoutes(app);

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3663");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", function (req, res) {
  res.send("Welcome to remallow!");
});

app.get("/packages", function (req, res) {
  getPackage(res);
});

app.get("/package/install", function (req, res) {
  const {
    query: { manager, dependency, packageName },
  } = req;

  const resultKeyword = cleanup(packageName);

  console.log("Installing... ".green + resultKeyword);
  console.log(`${manager} install ${packageName} ${dependency}`.green);

  exec(
    `${manager} install ${packageName} ${dependency}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`.red);
        res.status(500).send({
          success: false,
          message: `error: ${error.message}`,
        });
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`.red);
        res.status(500).send({
          success: false,
          message: `stderr: ${stderr}`,
        });
        return;
      }
      console.log(`stdout: ${stdout}`);
      res.status(200).send({
        success: true,
      });
    }
  );
});

app.get("/package/uninstall", function (req, res) {
  console.log("Removing... ".green + req.query.packageName);

  exec(`npm uninstall ${req.query.packageName}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`.red);
      res.status(500).send({
        success: false,
        message: `error: ${error.message}`,
      });
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`.red);
      res.status(500).send({
        success: false,
        message: `stderr: ${stderr}`,
      });
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).send({
      success: true,
    });
  });
});

app.get("/package/search", function (req, res) {
  const {
    query: { keyword },
  } = req;
  // let removeElements = ["npm","yarn", "--save", "--save-dev", " install ", " add "];
  const resultKeyword = cleanup(keyword);

  console.log("Searching... ".green + resultKeyword);

  exec(`npm search ${resultKeyword} --json`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`.red);
      res.status(500).send({
        success: false,
        message: `error: ${error.message}`,
      });
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`.red);
      res.status(500).send({
        success: false,
        message: `stderr: ${stderr}`,
      });
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).send({
      success: true,
      json: JSON.parse(stdout),
      keyword: resultKeyword,
    });
  });
});

app.listen(8081, function () {
  var host = "http://127.0.0.1";
  var port = "8081";
  console.log("Remallow app listening at %s:%s".magenta, host, port);
});

ChromeLauncher.launch({
  startingUrl: "http://127.0.0.1:8081",
}).then((chrome) => {
  console.log(`Remallow Package Manager running on http://127.0.0.1:8081`);
});
