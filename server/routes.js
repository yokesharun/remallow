const { execFile } = require("child_process");
const { validatePackageName, validateManager } = require("./utils/helper");

function appRoutes({ app, getPackage }) {
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3663");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

  app.get("/packages", function (req, res) {
    getPackage(res);
  });

  app.post("/package/install", function (req, res) {
    const {
      query: { manager, dependency, packageName },
    } = req;

    if (!validateManager(manager) || !validatePackageName(packageName)) {
      return res.status(400).send({ success: false, message: "Invalid input" });
    }

    const validDeps = ["--save", "--save-dev"];
    const dep = validDeps.includes(dependency) ? dependency : "--save";
    const installKey = manager === "npm" ? "install" : "add";

    console.log("Installing... ".green + packageName);

    execFile(manager, [installKey, packageName, dep], (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`.red);
        return res.status(500).send({
          success: false,
          message: `error: ${error.message}`,
        });
      }
      if (stderr) {
        console.log(`stderr (warning): ${stderr}`.yellow);
      }
      console.log(`stdout: ${stdout}`);
      res.status(200).send({ success: true });
    });
  });

  app.post("/package/uninstall", function (req, res) {
    const {
      query: { manager, packageName },
    } = req;

    if (!validateManager(manager) || !validatePackageName(packageName)) {
      return res.status(400).send({ success: false, message: "Invalid input" });
    }

    const installKey = manager === "npm" ? "uninstall" : "remove";
    console.log("Removing... ".green + packageName);

    execFile(manager, [installKey, packageName], (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`.red);
        return res.status(500).send({
          success: false,
          message: `error: ${error.message}`,
        });
      }
      if (stderr) {
        console.log(`stderr (warning): ${stderr}`.yellow);
      }
      console.log(`stdout: ${stdout}`);
      res.status(200).send({ success: true });
    });
  });

  app.post("/package/upgrade", function (req, res) {
    const {
      query: { manager, packageName },
    } = req;

    if (!validateManager(manager) || !validatePackageName(packageName)) {
      return res.status(400).send({ success: false, message: "Invalid input" });
    }

    console.log("Upgrading... ".green + packageName);

    execFile(manager, ["upgrade", packageName], (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`.red);
        return res.status(500).send({
          success: false,
          message: `error: ${error.message}`,
        });
      }
      if (stderr) {
        console.log(`stderr (warning): ${stderr}`.yellow);
      }
      console.log(`stdout: ${stdout}`);
      res.status(200).send({ success: true });
    });
  });

  app.get("/package/search", function (req, res) {
    const {
      query: { keyword },
    } = req;

    if (!keyword || typeof keyword !== "string" || keyword.length > 100) {
      return res.status(400).send({ success: false, message: "Invalid keyword" });
    }

    const sanitized = keyword.replace(/[^a-zA-Z0-9@/_.-]/g, "");
    console.log("Searching... ".green + sanitized);

    execFile("npm", ["search", sanitized, "--json"], (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`.red);
        return res.status(500).send({
          success: false,
          message: `error: ${error.message}`,
        });
      }
      if (stderr) {
        console.log(`stderr (warning): ${stderr}`.yellow);
      }
      console.log(`stdout: ${stdout}`);
      res.status(200).send({
        success: true,
        json: JSON.parse(stdout),
        keyword: sanitized,
      });
    });
  });
}

module.exports = {
  appRoutes,
};
