import React from "react";

const Packages = ({ dependencies, option, outdated, loadingPackages, onViewDetail }) => {
  const packages = Object.keys(dependencies);

  return packages.map((item, index) => {
    const isOutdated = outdated && outdated[item];
    const isLoading = loadingPackages && loadingPackages[item];
    const staggerClass = `stagger-${Math.min((index % 6) + 1, 6)}`;

    return (
      <div key={item} className={`package-card ${staggerClass}`}>
        <div className="package-info">
          <div className="package-name" onClick={() => onViewDetail && onViewDetail(item)}>
            {item}
          </div>
          <div>
            <span className="package-version">
              <span className={`version-dot ${isOutdated ? "outdated" : ""}`}></span>
              {dependencies[item]}
            </span>
            {isOutdated && (
              <span className="outdated-badge">
                <i className="fas fa-arrow-up" style={{ fontSize: 9 }}></i>
                update available
              </span>
            )}
          </div>
          <div className="package-type">{option}</div>
        </div>
        <div className="package-actions">
          {isOutdated && (
            <button
              className="btn btn-sm btn-success"
              data-name="upgrade"
              data-item={item}
              disabled={isLoading}
              title="Upgrade"
            >
              {isLoading === "upgrade" ? (
                <span className="spinner"></span>
              ) : (
                <i className="fas fa-arrow-up"></i>
              )}
            </button>
          )}
          <button
            className="btn btn-sm btn-danger"
            data-name="uninstall"
            data-item={item}
            disabled={isLoading}
            title="Uninstall"
          >
            {isLoading === "uninstall" ? (
              <span className="spinner" style={{ borderColor: "rgba(255,107,107,0.3)", borderTopColor: "var(--danger)" }}></span>
            ) : (
              <i className="fas fa-trash-alt"></i>
            )}
          </button>
        </div>
      </div>
    );
  });
};

export default Packages;
