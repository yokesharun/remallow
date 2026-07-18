import axios from "axios";

export const getPackage = ({
  setIsLoading,
  setPackages,
  setLastActivity,
  params,
}) => {
  setIsLoading(true);
  axios
    .get("http://127.0.0.1:8081/packages", {
      params: params,
    })
    .then(function (response) {
      setPackages(response.data);
    })
    .catch(function (error) {
      console.log(error);
      setLastActivity(error.message);
    })
    .then(function () {
      setIsLoading(false);
    });
};

export const installPackage = ({
  packageName,
  setIsLoading,
  params,
  setPackageName,
  setLastActivity,
  getAllPackages,
}) => {
  setIsLoading(true);
  axios
    .post("http://127.0.0.1:8081/package/install", null, {
      params,
    })
    .then(function (response) {
      if (response.data.success) {
        getAllPackages();
      }
      setPackageName("");
    })
    .catch(function (error) {
      console.log(error);
      setLastActivity(error.message);
    })
    .then(function () {
      setLastActivity(`Installed ${packageName} package`);
      setIsLoading(false);
    });
};

export const uninstallPackage = ({
  item,
  manager,
  event,
  getAllPackages,
  setPackageName,
  setLastActivity,
}) => {
  axios
    .post("http://127.0.0.1:8081/package/uninstall", null, {
      params: {
        packageName: item,
        manager,
      },
    })
    .then(function (response) {
      if (response.data.success) {
        getAllPackages();
      }
      setPackageName("");
    })
    .catch(function (error) {
      console.log(error);
      setLastActivity(error.message);
    })
    .then(function () {
      if (event.target.tagName === "BUTTON") {
        event.target.className = event.target.className.replace(
          "is-loading",
          ""
        );
        event.target.blur();
      } else {
        const element = event.target.closest("button");
        element.className = element.className.replace("is-loading", "");
        element.blur();
      }
      setLastActivity(`Uninstalled ${item} package`);
    });
};

export const upgradePackage = ({
  item,
  manager,
  event,
  getAllPackages,
  setPackageName,
  setLastActivity,
}) => {
  axios
    .post("http://127.0.0.1:8081/package/upgrade", null, {
      params: {
        packageName: item,
        manager,
      },
    })
    .then(function (response) {
      if (response.data.success) {
        getAllPackages();
      }
      setPackageName("");
    })
    .catch(function (error) {
      console.log(error);
      setLastActivity(error.message);
    })
    .then(function () {
      if (event.target.tagName === "BUTTON") {
        event.target.className = event.target.className.replace(
          "is-loading",
          ""
        );
        event.target.blur();
      } else {
        const element = event.target.closest("button");
        element.className = element.className.replace("is-loading", "");
        element.blur();
      }
      setLastActivity(`Upgraded ${item} package`);
    });
};

export const searchPackage = ({
  packageName,
  setLastActivity,
  setSearchResult,
  setIsSearchLoading,
}) => {
  setIsSearchLoading(true);
  axios
    .get("http://127.0.0.1:8081/package/search", {
      params: {
        keyword: packageName,
      },
    })
    .then(function (response) {
      setSearchResult(response.data.json);
    })
    .catch(function (error) {
      console.log(error);
      setLastActivity(error.message);
    })
    .then(function () {
      setLastActivity(`Searched for ${packageName}`);
      setIsSearchLoading(false);
    });
};
