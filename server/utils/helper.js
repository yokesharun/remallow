const PACKAGE_NAME_RE = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

function validatePackageName(name) {
  if (!name || typeof name !== "string") return false;
  return PACKAGE_NAME_RE.test(name);
}

function validateManager(manager) {
  return manager === "npm" || manager === "yarn";
}

module.exports = {
  validatePackageName,
  validateManager,
};
