function cleanup(packageName) {
    return packageName
    .replace("npm", "")
    .replace("yarn", "")
    .replace("install", "")
    .replace("add", "")
    .replace("--save", "")
    .replace(/ /g, "");
}

module.exports = {
    cleanup
}