import React from "react";

const Manager = ({setManager}) => {
  const updateManager = (value) => {
    localStorage.setItem("manager", value);
    setManager(value);
  };
  return (
    <div className="manager-block">
      <div class="block">
        Please select which package manager you are using for this project
      </div>
      <div class="block">
        <button
          class="button is-link is-normal"
          onClick={() => updateManager("npm")}
        >
          NPM
        </button>
        <button
          class="button is-link is-normal"
          onClick={() => updateManager("yarn")}
        >
          Yarn
        </button>
      </div>
    </div>
  );
};

export default Manager;
