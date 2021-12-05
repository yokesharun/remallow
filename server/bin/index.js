#!/usr/bin/env node

const colors = require("colors");
const { exec, execSync } = require("child_process");

const currentFolder = process.cwd();

// const ChromeLauncher = require('chrome-launcher');

// ChromeLauncher.launch({
//     startingUrl: 'http://127.0.0.1:4000',
//     chromeFlags: [`--app=http://127.0.0.1:4000`]
// }).then(chrome => {
//     console.log(`Remallow Package Manager running on http://127.0.0.1:4000`);
// });

const getPackage = (res) => {
  var fs = require("fs"),
    path = require("path"),
    filePath = path.join(currentFolder, "package.json");
  fs.readFile(filePath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const stdout = execSync(`npm list --json=true`).toString();
    res.send({
      raw: JSON.parse(jsonString),
      json: JSON.parse(stdout),
      currentFolder,
    });
  });
};

var express = require("express");
var app = express();

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

app.get("/package", function (req, res) {
  getPackage(res);
});

app.get("/package/:packageName", function (req, res) {
  console.log(colors.brightMagenta("Installing... " + req.params.packageName));

  exec(`npm install ${req.params.packageName}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.send({
      result: "ok",
    });
  });
});

app.get("/package/remove/:packageName", function (req, res) {
  console.log(colors.brightMagenta("Removing... " + req.params.packageName));

  exec(`npm uninstall ${req.params.packageName}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.send({
      result: "ok",
    });
  });
});

app.listen(8081, function () {
  var host = "http://127.0.0.1";
  var port = "8081";
  console.log("Example app listening at %s:%s", host, port);
});
