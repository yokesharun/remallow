import React, { useEffect, useState } from "react";
import { getPackage, installPackage, uninstallPackage } from "../utils/api";
import Packages from "./Packages";

const List = () => {
  const [packages, setPackages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [manager, setManager] = useState("npm");
  const [dependency, setDependency] = useState("--save");
  const [lastActivity, setLastActivity] = useState("");

  useEffect(() => {
    getAllPackages();
    document
      .getElementById("packages")
      .addEventListener("click", clickEventListener, true);
  }, []);

  const getAllPackages = () => {
    getPackage({ setIsLoading, setPackages });
  };

  const install = () => {
    if (packageName !== "") {
      if (listOfPackages.includes(packageName)) {
        setLastActivity(`${packageName} is Already Installed!`);
        return;
      }
      installPackage({
        params: {
          manager,
          dependency,
        },
        packageName,
        setIsLoading,
        setLastActivity,
        setPackageName,
        setLastActivity,
        setPackageName,
        getAllPackages,
      });
    }
  };

  const clickEventListener = (event) => {
    let item;

    if (event.target.tagName === "BUTTON") {
      item = event.target.getAttribute("data-item");
      event.target.className += " is-loading";
    } else {
      const element = event.target.closest("button");
      element.className += " is-loading";
      item = element.getAttribute("data-item");
    }
    if (item) {
      uninstallPackage({
        item,
        event,
        getAllPackages,
        setPackageName,
        setLastActivity,
      });
    }
  };

  const obj = {
    ...packages.json,
  };

  const newObj = {
    ...obj,
    dependencies: {
      ...obj.dependencies,
    },
  };

  const listOfPackages = Object.keys(newObj.dependencies);

  const { currentFolder = "", json: { name: projectName = "" } = {} } =
    packages;

  return (
    <div>
      <section className="section is-small">
        <h1 className="title is-size-4">
          React Package Manager{" "}
          <span className="tag is-dark">
            <i className="fas fa-sync fa-spin loader-icon"></i> Running:{" "}
            {projectName}
          </span>
          {lastActivity && (
            <span className="tag is-warning loader-block">
              <i className="fas fa-history loader-icon"></i>Last Activity:{" "}
              {lastActivity}
            </span>
          )}
        </h1>
        <h6 className="subtitle is-size-7">
          A simple tool to manager your <strong>package.json</strong> file.
        </h6>
        <div className="field">
          <input
            className="input is-link"
            type="text"
            placeholder="Search your packages here"
            onChange={(e) => setPackageName(e.target.value)}
            value={packageName}
          />
        </div>
        {/* <div className="select is-link is-small field select-field" value="npm">
          <select onChange={(e) => setManager(e.target.value)}>
            <option value='npm'>npm</option>
            <option value='yarn'>yarn</option>
          </select>
        </div> */}
        <div className="select is-link is-small field select-field">
          <select
            onChange={(e) => setDependency(e.target.value)}
            value="--save"
          >
            <option value="--save">
              dependencies
            </option>
            <option value="--save-dev">devDependencies</option>
          </select>
        </div>
        <span>
          Terminal cmd:{" "}
          <code>{`${manager} install ${packageName} ${dependency}`} </code>
        </span>
        <div className="field">
          <button
            className={`button is-link ${isLoading ? "is-loading" : ""}`}
            onClick={() => install()}
          >
            Install Package
          </button>
        </div>
      </section>
      <section className="section">
        <h1 className="title is-size-5">
          Installed Packages ({listOfPackages.length})
        </h1>
        <h6 className="subtitle is-size-7">
          Packages listed here are fetched from your{" "}
          <strong>{currentFolder}/Package.json</strong> file.
        </h6>
        <div
          className="columns is-multiline is-mobile list-items"
          id="packages"
        >
          <Packages listOfPackages={listOfPackages} />
        </div>
      </section>
    </div>
  );
};

export default List;
