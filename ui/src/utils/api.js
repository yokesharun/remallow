import axios from "axios";

export const getPackage = ({ setIsLoading, setPackages, showToast }) => {
  setIsLoading(true);
  return axios
    .get("/packages")
    .then((response) => {
      setPackages(response.data);
    })
    .catch((error) => {
      if (showToast) showToast(error.message, "error");
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const installPackage = ({ packageName, setIsLoading, params, setPackageName, showToast, getAllPackages }) => {
  setIsLoading(true);
  return axios
    .post("/package/install", null, { params })
    .then((response) => {
      if (response.data.success) {
        getAllPackages();
        if (showToast) showToast(`Successfully installed ${packageName}`, "success");
      }
      setPackageName("");
    })
    .catch((error) => {
      if (showToast) showToast(`Failed to install ${packageName}: ${error.message}`, "error");
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const uninstallPackage = ({ item, manager, showToast, getAllPackages, setLoadingPackages }) => {
  if (setLoadingPackages) setLoadingPackages((prev) => ({ ...prev, [item]: "uninstall" }));
  return axios
    .post("/package/uninstall", null, {
      params: { packageName: item, manager },
    })
    .then((response) => {
      if (response.data.success) {
        getAllPackages();
        if (showToast) showToast(`Uninstalled ${item}`, "success");
      }
    })
    .catch((error) => {
      if (showToast) showToast(`Failed to uninstall ${item}: ${error.message}`, "error");
    })
    .finally(() => {
      if (setLoadingPackages) setLoadingPackages((prev) => {
        const next = { ...prev };
        delete next[item];
        return next;
      });
    });
};

export const upgradePackage = ({ item, manager, showToast, getAllPackages, setLoadingPackages }) => {
  if (setLoadingPackages) setLoadingPackages((prev) => ({ ...prev, [item]: "upgrade" }));
  return axios
    .post("/package/upgrade", null, {
      params: { packageName: item, manager },
    })
    .then((response) => {
      if (response.data.success) {
        getAllPackages();
        if (showToast) showToast(`Upgraded ${item}`, "success");
      }
    })
    .catch((error) => {
      if (showToast) showToast(`Failed to upgrade ${item}: ${error.message}`, "error");
    })
    .finally(() => {
      if (setLoadingPackages) setLoadingPackages((prev) => {
        const next = { ...prev };
        delete next[item];
        return next;
      });
    });
};

export const searchPackage = ({ packageName, setSearchResult, setIsSearchLoading }) => {
  setIsSearchLoading(true);
  return axios
    .get("/package/search", { params: { keyword: packageName } })
    .then((response) => {
      setSearchResult(response.data.json || []);
    })
    .catch(() => {
      setSearchResult([]);
    })
    .finally(() => {
      setIsSearchLoading(false);
    });
};

export const getPackageInfo = (name) => {
  return axios
    .get("/package/info", { params: { name } })
    .then((response) => response.data.data)
    .catch(() => null);
};
