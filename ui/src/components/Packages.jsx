import React from "react";

const Packages = ({ listOfPackages }) => {
  return listOfPackages.map((item) => (
    <div className="column is-one-third">
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

export default Packages;
