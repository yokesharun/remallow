import React, { useEffect, useState, useCallback, useev } from "react";
import axios from "axios";
import ReactJson from "react-json-view";

const List = () => {
  const [packages, setPackages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [manager, setManager] = useState("npm");
  const [dependency, setDependency] = useState("--save");

  useEffect(() => {
    getPackage();
    document.getElementById("packages").addEventListener('click', clickEventListener, true)
  }, []);

  const clickEventListener = (event) => {
    let item;

    if(event.target.tagName === 'BUTTON'){
      item = event.target.getAttribute("data-item");
      event.target.className += ' is-loading';
    }else{
      const element = event.target.closest("button");
      element.className += ' is-loading';
      item = element.getAttribute("data-item");
    }
    RemovePackage(item, event);
  }

  const getPackage = () => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8081/package", {
        mode: "no-cors",
      })
      .then(function (response) {
        // handle success
        setPackages(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        setIsLoading(false);
      });
  };

  const installPackage = () => {
    if (packageName !== "") {
      setIsLoading(true);
      axios
        .get("http://127.0.0.1:8081/package/" + packageName, {
          params: {
            manager,
            dependency
          }
        })
        .then(function (response) {
          if (response.data.success) {
            getPackage();
          }
          setPackageName("");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
          setIsLoading(false);
        });
    }
  };

  const RemovePackage = (item, event) => {
    if (item !== "") {
      axios
        .get("http://127.0.0.1:8081/package/remove/" + item)
        .then(function (response) {
          if (response.data.success) {
            getPackage();
          }
          setPackageName("");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
          if(event.target.tagName === 'BUTTON'){
            event.target.className = event.target.className.replace('is-loading','');
            event.target.blur();
          }else{
            const element = event.target.closest("button");
            element.className = element.className.replace('is-loading','');
            element.blur();
          }
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

  const renderPackages = (listOfPackages) => {
    return listOfPackages.map((item) => (
      <div class="column is-one-third">
        <div className="tile is-child box item-wrapper">
          <div>
            <p className="title is-size-6">{item}</p>
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-link">version</span>
                <span className="tag is-light">0.9.3</span>
              </div>
            </div>
          </div>
          <div className="half">
            <button
              className="button is-danger is-outlined is-small"
              data-item={item}
              title="Uninstall"
            >
              <span className="icon is-small">
                <i className="fas fa-trash-alt"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <section className="section is-small">
        <h1 className="title is-size-4">
          NPM Package Manager{" "}
          <span class="tag is-warning">
            <i class="fas fa-sync fa-spin loader-sync"></i> Running:{" "}
            {projectName}
          </span>
        </h1>
        <h6 className="subtitle is-size-7">
          A simple tool to manager your <strong>package.json</strong> file.
        </h6>
        <div class="field">
          <input
            className="input is-link"
            type="text"
            placeholder="Search your packages here"
            onChange={(e) => setPackageName(e.target.value)}
            value={packageName}
          />
        </div>
        {/* <div class="select is-link is-small field select-field">
          <select onChange={(e) => setManager(e.target.value)}>
            <option value='npm' selected>npm</option>
            <option value='yarn'>yarn</option>
          </select>
        </div> */}
        <div class="select is-link is-small field select-field">
          <select onChange={(e) => setDependency(e.target.value)}>
            <option value='--save' selected>dependencies</option>
            <option value='--save-dev'>devDependencies</option>
          </select>
        </div>
        <span>
          Terminal cmd: <code>{`${manager} install ${packageName} ${dependency}`} </code>
        </span>
        <div class="field">
          <button class={`button is-link ${isLoading ? "is-loading" : ""}`} onClick={() => installPackage()}>
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
        <div class="columns is-multiline is-mobile list-items" id="packages">
          {renderPackages(listOfPackages)}
        </div>
      </section>
    </div>
  );
};

export default List;
