import React from "react";

const Packages = ({ dependencies, option, outdated }) => {
  const packages = Object.keys(dependencies);
  console.log(outdated);
  return packages.map((item) => (
    <div className="column is-half">
      <div className="tile is-child box item-wrapper">
        <div className="half">
          <p className="title is-size-6">{item}</p>
          <div className="tags has-addons">
            <span className="tag is-link">{option}</span>
            <span className="tag is-link is-light">{dependencies[item]}</span>
            {outdated[item] && (
              <span className="tag is-danger is-light outdated">outdated</span>
            )}
        </div>
        </div>
        <div className="half">
          {outdated[item] && (
            <button
              className="button is-success is-outlined is-small action-btn"
              data-name="upgrade"
              data-item={item}
              title="Upgrade"
            >
              <span className="icon is-small">
                <i className="fas fa-arrow-up"></i>
              </span>
            </button>
          )}
          <button
            className="button is-danger is-outlined is-small"
            data-name="uninstall"
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

export default Packages;
