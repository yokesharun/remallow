import React from "react";

const Manager = ({setManager}) => {
  const updateManager = (value) => {
    localStorage.setItem("manager", value);
    setManager(value);
  };
  return (
    <div className="manager-block">
      <div className="notification is-link is-light">
      Note: Do yarn install or npm install before proceeding to next step and to keep your project dependencies upto date or it might fail to load details.
      <br/>If you're facing any issue please click the above issue button on the navigation bar and report.
      If you like it dont forget to give *Star*
      </div>
      <div className="block">
        Please select which package manager you are using for this project
        <br/>(It works well with npm!)
      </div>
      <div className="block">
        <button
          className="button is-link is-normal"
          onClick={() => updateManager("npm")}
        >
          NPM
        </button>
        <button
          className="button is-link is-normal"
          onClick={() => updateManager("yarn")}
        >
          Yarn
        </button>
      </div>
    </div>
  );
};

export default Manager;
