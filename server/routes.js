const spawn = require("cross-spawn");
const chalk = require("chalk");
const { validatePackageName, validateManager, COMMAND_MAP } = require("./utils/helper");

function appRoutes({ app, getPackage }) {
  app.get("/packages", function (req, res) {
    getPackage(res);
  });

  app.post("/package/install", function (req, res) {
    const {
      query: { manager, dependency, packageName },
    } = req;

    if (!validateManager(manager) || !validatePackageName(packageName)) {
      return res.status(400).send({ success: false, message: "Invalid package name or manager" });
    }

    const validDeps = ["--save", "--save-dev"];
    const dep = validDeps.includes(dependency) ? dependency : "--save";
    const cmd = COMMAND_MAP[manager];

    console.log(chalk.green("Installing... " + packageName));

    const child = spawn(manager, [cmd.install, packageName, dep]);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => { stdout += data; });
    child.stderr.on("data", (data) => { stderr += data; });

    child.on("error", (error) => {
      console.log(chalk.red(`error: ${error.message}`));
      res.status(500).send({ success: false, message: error.message });
    });

    child.on("close", (code) => {
      if (code !== 0) {
        console.log(chalk.red(`Process exited with code ${code}`));
        return res.status(500).send({ success: false, message: stderr || `Process exited with code ${code}` });
      }
      if (stderr) console.log(chalk.yellow(`stderr (warning): ${stderr}`));
      console.log(`stdout: ${stdout}`);
      res.status(200).send({ success: true });
    });
  });

  app.post("/package/uninstall", function (req, res) {
    const {
      query: { manager, packageName },
    } = req;

    if (!validateManager(manager) || !validatePackageName(packageName)) {
      return res.status(400).send({ success: false, message: "Invalid package name or manager" });
    }

    const cmd = COMMAND_MAP[manager];
    console.log(chalk.green("Removing... " + packageName));

    const child = spawn(manager, [cmd.uninstall, packageName]);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => { stdout += data; });
    child.stderr.on("data", (data) => { stderr += data; });

    child.on("error", (error) => {
      console.log(chalk.red(`error: ${error.message}`));
      res.status(500).send({ success: false, message: error.message });
    });

    child.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).send({ success: false, message: stderr || `Process exited with code ${code}` });
      }
      if (stderr) console.log(chalk.yellow(`stderr (warning): ${stderr}`));
      res.status(200).send({ success: true });
    });
  });

  app.post("/package/upgrade", function (req, res) {
    const {
      query: { manager, packageName },
    } = req;

    if (!validateManager(manager) || !validatePackageName(packageName)) {
      return res.status(400).send({ success: false, message: "Invalid package name or manager" });
    }

    const cmd = COMMAND_MAP[manager];
    console.log(chalk.green("Upgrading... " + packageName));

    const child = spawn(manager, [cmd.upgrade, packageName]);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => { stdout += data; });
    child.stderr.on("data", (data) => { stderr += data; });

    child.on("error", (error) => {
      console.log(chalk.red(`error: ${error.message}`));
      res.status(500).send({ success: false, message: error.message });
    });

    child.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).send({ success: false, message: stderr || `Process exited with code ${code}` });
      }
      if (stderr) console.log(chalk.yellow(`stderr (warning): ${stderr}`));
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
    console.log(chalk.green("Searching... " + sanitized));

    const child = spawn("npm", ["search", sanitized, "--json"]);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => { stdout += data; });
    child.stderr.on("data", (data) => { stderr += data; });

    child.on("error", (error) => {
      console.log(chalk.red(`error: ${error.message}`));
      res.status(500).send({ success: false, message: error.message });
    });

    child.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).send({ success: false, message: stderr || "Search failed" });
      }
      if (stderr) console.log(chalk.yellow(`stderr (warning): ${stderr}`));
      try {
        res.status(200).send({
          success: true,
          json: JSON.parse(stdout),
          keyword: sanitized,
        });
      } catch (e) {
        res.status(500).send({ success: false, message: "Failed to parse search results" });
      }
    });
  });

  app.get("/package/info", function (req, res) {
    const { query: { name } } = req;

    if (!validatePackageName(name)) {
      return res.status(400).send({ success: false, message: "Invalid package name" });
    }

    const child = spawn("npm", ["view", name, "--json"]);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => { stdout += data; });
    child.stderr.on("data", (data) => { stderr += data; });

    child.on("error", (error) => {
      res.status(500).send({ success: false, message: error.message });
    });

    child.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).send({ success: false, message: "Package not found" });
      }
      try {
        res.status(200).send({ success: true, data: JSON.parse(stdout) });
      } catch (e) {
        res.status(500).send({ success: false, message: "Failed to parse package info" });
      }
    });
  });
}

module.exports = {
  appRoutes,
};
