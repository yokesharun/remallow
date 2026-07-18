import React, { useState, useEffect } from "react";

const SearchDropdown = ({ results, onSelect, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!results || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        onSelect(results[activeIndex]);
      } else if (e.key === "Escape") {
        setActiveIndex(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [results, activeIndex, onSelect]);

  if (isLoading) {
    return (
      <div className="search-dropdown">
        <div className="search-result-item" style={{ textAlign: "center" }}>
          <i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>
          Searching npm registry...
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) return null;

  return (
    <div className="search-dropdown">
      {results.slice(0, 8).map((item, index) => (
        <div
          key={item.name}
          className={`search-result-item ${index === activeIndex ? "active" : ""}`}
          onClick={() => onSelect(item)}
          onMouseEnter={() => setActiveIndex(index)}
        >
          <div className="search-result-name">{item.name}</div>
          {item.description && (
            <div className="search-result-desc">{item.description}</div>
          )}
          <div className="search-result-meta">
            {item.version && <span>v{item.version}</span>}
            {item.date && <span>{new Date(item.date).toLocaleDateString()}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
