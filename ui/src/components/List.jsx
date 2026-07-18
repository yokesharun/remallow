import React, { useEffect, useRef, useState } from "react";
import {
  getPackage,
  installPackage,
  uninstallPackage,
  upgradePackage,
  searchPackage,
} from "../utils/api";
import Packages from "./Packages";
import SearchDropdown from "./SearchDropdown";
import SkeletonGrid from "./SkeletonCard";
import PackageDetail from "./PackageDetail";
import { useDebounce } from "../utils/hooks";
import { useToast } from "../contexts/ToastContext";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "dependencies", label: "Dependencies" },
  { key: "devDependencies", label: "Dev Dependencies" },
  { key: "outdated", label: "Outdated" },
];

const List = ({ manager, setManager }) => {
  const [packages, setPackages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [packageName, setPackageName] = useState("");
  const [dependency, setDependency] = useState("--save");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loadingPackages, setLoadingPackages] = useState({});
  const [detailPackage, setDetailPackage] = useState(null);
  const searchRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    getAllPackages();
  }, []);

  const getAllPackages = () => {
    getPackage({ setIsLoading, setPackages, showToast });
  };

  const debouncedSearchTerm = useDebounce(packageName, 500);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
      searchPackage({
        packageName: debouncedSearchTerm,
        setSearchResult,
        setIsSearchLoading,
      });
      setShowDropdown(true);
    } else {
      setSearchResult([]);
      setShowDropdown(false);
    }
  }, [debouncedSearchTerm]);

  const install = () => {
    if (!packageName.trim()) return;

    const allPkgs = depPackages.concat(devDepPackages);
    if (allPkgs.includes(packageName)) {
      showToast(`${packageName} is already installed`, "info");
      return;
    }

    installPackage({
      params: { manager, dependency, packageName },
      packageName,
      setIsLoading,
      showToast,
      setPackageName,
      getAllPackages,
    });
  };

  const handlePackageAction = (item, action) => {
    const handler = action === "uninstall" ? uninstallPackage : upgradePackage;
    handler({
      item,
      manager,
      showToast,
      getAllPackages,
      setLoadingPackages,
    });
  };

  const handlePackageClick = (e) => {
    const button = e.target.closest("button[data-item]");
    if (!button) return;

    const item = button.getAttribute("data-item");
    const action = button.getAttribute("data-name");
    if (item && action) {
      handlePackageAction(item, action);
    }
  };

  const onSelectSearch = (item) => {
    setPackageName(item.name);
    setShowDropdown(false);
    setSearchResult([]);
  };

  const raw = packages.raw || {};
  const deps = raw.dependencies || {};
  const devDeps = raw.devDependencies || {};
  const depPackages = Object.keys(deps);
  const devDepPackages = Object.keys(devDeps);
  const outdated = packages.outdated || {};
  const outdatedCount = Object.keys(outdated).length;
  const totalCount = depPackages.length + devDepPackages.length;

  const {
    currentFolder = "",
    raw: { name: projectName = "" } = {},
  } = packages;

  const handleUpdateAll = () => {
    const outdatedPkgs = Object.keys(outdated);
    if (outdatedPkgs.length === 0) return;

    showToast(`Upgrading ${outdatedPkgs.length} packages...`, "info");
    outdatedPkgs.reduce((promise, pkg) => {
      return promise.then(() =>
        upgradePackage({
          item: pkg,
          manager,
          showToast,
          getAllPackages: () => {},
          setLoadingPackages,
        })
      );
    }, Promise.resolve()).then(() => {
      getAllPackages();
      showToast("All packages updated", "success");
    });
  };

  return (
    <div className="main-container">
      <div className="search-section">
        <div className="project-header">
          <div className="project-name">
            {projectName || (
              <span style={{ color: "var(--text-muted)" }}>Loading project...</span>
            )}
            {projectName && (
              <span className="project-badge">
                <i className="fas fa-folder-open" style={{ fontSize: 11 }}></i>
                {currentFolder.split(/[/\\]/).pop()}
              </span>
            )}
          </div>
          {manager && (
            <button className="btn btn-sm btn-outline" onClick={() => { localStorage.removeItem("manager"); setManager(null); }}>
              <i className="fas fa-exchange-alt" style={{ fontSize: 11 }}></i>
              Switch from {manager}
            </button>
          )}
        </div>

        <div className="search-bar-wrap" ref={searchRef}>
          <i className="fas fa-search search-icon"></i>
          <input
            className="search-bar"
            type="text"
            placeholder="Search packages on npm..."
            onChange={(e) => setPackageName(e.target.value)}
            onFocus={() => searchResult.length > 0 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            value={packageName}
          />
          {showDropdown && (
            <SearchDropdown
              results={searchResult}
              isLoading={isSearchLoading}
              onSelect={onSelectSearch}
            />
          )}
        </div>

        <div className="install-row">
          <select
            className="dep-select"
            onChange={(e) => setDependency(e.target.value)}
            value={dependency}
          >
            <option value="--save">dependencies</option>
            <option value="--save-dev">devDependencies</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={install}
            disabled={isLoading || !packageName.trim()}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Installing...
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i>
                Install Package
              </>
            )}
          </button>
        </div>

        <div className="cmd-preview">
          <code>
            {manager} {manager === "npm" ? "install" : "add"} {packageName || "<package>"} {dependency}
          </code>
        </div>
      </div>

      <div className="packages-header">
        <div>
          <span className="packages-title">
            Installed Packages <span className="packages-count">({totalCount})</span>
          </span>
        </div>
        {outdatedCount > 0 && (
          <button className="btn btn-sm btn-success" onClick={handleUpdateAll}>
            <i className="fas fa-sync-alt"></i>
            Update All ({outdatedCount})
          </button>
        )}
      </div>

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            {f.key === "outdated" && outdatedCount > 0 && (
              <span style={{
                background: "var(--warning)",
                color: "#000",
                fontSize: 10,
                padding: "1px 6px",
                borderRadius: 10,
                marginLeft: 4,
                fontWeight: 600,
              }}>
                {outdatedCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading && totalCount === 0 ? (
        <SkeletonGrid count={6} />
      ) : (
        <div className="package-grid" onClick={handlePackageClick}>
          {(filter === "all" || filter === "dependencies") && (
            <Packages
              dependencies={filter === "outdated"
                ? Object.fromEntries(Object.entries(deps).filter(([k]) => outdated[k]))
                : deps
              }
              option="dependencies"
              outdated={outdated}
              loadingPackages={loadingPackages}
              onViewDetail={setDetailPackage}
            />
          )}
          {(filter === "all" || filter === "devDependencies") && (
            <Packages
              dependencies={filter === "outdated"
                ? Object.fromEntries(Object.entries(devDeps).filter(([k]) => outdated[k]))
                : devDeps
              }
              option="devDependencies"
              outdated={outdated}
              loadingPackages={loadingPackages}
              onViewDetail={setDetailPackage}
            />
          )}
          {filter === "outdated" && outdatedCount === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
              <i className="fas fa-check-circle" style={{ fontSize: 32, marginBottom: 8, display: "block", color: "var(--success)" }}></i>
              All packages are up to date
            </div>
          )}
        </div>
      )}

      {detailPackage && (
        <PackageDetail name={detailPackage} onClose={() => setDetailPackage(null)} />
      )}
    </div>
  );
};

export default List;
