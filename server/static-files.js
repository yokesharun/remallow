const { resolve } = require("path");
const express = require("express");

function initializeStaticRoutes(app) {
  app.use(express.static(resolve(__dirname, "../ui")));
}

module.exports = {
  initializeStaticRoutes,
};
