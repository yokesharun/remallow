const { resolve } = require("path");

function initializeStaticRoutes(app) {
    app.get("/", (req, res) =>
    res.sendFile("./ui/index.html", {
      root: resolve(__dirname, "..")
    })
  );
  app.get("/main.js", (req, res) =>
    res.sendFile("./ui/main.js", {
      root: resolve(__dirname, "..")
    })
  );
  app.get("/favicon.ico", (req, res) =>
    res.sendFile("./ui/favicon.ico", {
      root: resolve(__dirname, "..")
    })
  );
}

module.exports = {
    initializeStaticRoutes
}