const PACKAGE_NAME_RE = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(@[a-zA-Z0-9._^~><=|-]+)?$/;

const COMMAND_MAP = {
  npm: { install: "install", uninstall: "uninstall", upgrade: "update" },
  yarn: { install: "add", uninstall: "remove", upgrade: "upgrade" },
  pnpm: { install: "add", uninstall: "remove", upgrade: "update" },
};

function validatePackageName(name) {
  if (!name || typeof name !== "string") return false;
  return PACKAGE_NAME_RE.test(name);
}

function validateManager(manager) {
  return Object.keys(COMMAND_MAP).includes(manager);
}

module.exports = {
  validatePackageName,
  validateManager,
  COMMAND_MAP,
};
