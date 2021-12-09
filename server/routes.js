const { exec } = require("child_process");
const { cleanup } = require("./utils/helper");

function appRoutes({ app, getPackage }) {
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

    const installKey = manager === "npm" ? "install" : "add";
    const resultKeyword = cleanup(packageName);

    console.log("Installing... ".green + resultKeyword);
    console.log(`${manager} ${installKey} ${packageName} ${dependency}`.green);

    exec(
      `${manager} ${installKey} ${packageName} ${dependency}`,
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
    const {
      query: { manager, packageName },
    } = req;
    console.log("Removing... ".green + packageName);
    const installKey = manager === "npm" ? "uninstall" : "remove";

    exec(`${manager} ${installKey} ${packageName}`, (error, stdout, stderr) => {
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

  app.get("/package/upgrade", function (req, res) {
    const {
      query: { manager, packageName },
    } = req;
    console.log("Upgrading... ".green + packageName);
    const installKey = "upgrade";
    console.log(`${manager} ${installKey} ${packageName}`);

    exec(`${manager} ${installKey} ${packageName}`, (error, stdout, stderr) => {
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
}

module.exports = {
  appRoutes,
};
