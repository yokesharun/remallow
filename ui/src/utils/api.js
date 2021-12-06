import axios from "axios";

export const getPackage = ({ setIsLoading, setPackages }) => {
  setIsLoading(true);
  axios
    .get("http://127.0.0.1:8081/packages", {
      mode: "no-cors",
    })
    .then(function (response) {
      // handle success
      setPackages(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setLastActivity(error.message);
    })
    .then(function () {
      // always executed
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
    .get("http://127.0.0.1:8081/package/install/" + packageName, {
      params,
    })
    .then(function (response) {
      if (response.data.success) {
        getAllPackages();
      }
      setPackageName("");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setLastActivity(error.message);      
    })
    .then(function () {
      // always executed
      setLastActivity(`Installed ${packageName} package`);
      setIsLoading(false);
    });
};

export const uninstallPackage = ({
  item,
  event,
  getAllPackages,
  setPackageName,
  setLastActivity,
}) => {
  axios
    .get("http://127.0.0.1:8081/package/uninstall/" + item)
    .then(function (response) {
      if (response.data.success) {
        getAllPackages();
      }
      setPackageName("");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setLastActivity(error.message);
        })
    .then(function () {
      // always executed
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
