import React from "react";
import GitHubButton from "react-github-btn";

const Navigation = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="app-navbar">
      <a className="brand" href="https://github.com/yokesharun/remallow" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.2)" />
          <path d="M8 16l4-6h8l4 6-4 6h-8l-4-6z" fill="#fff" opacity="0.9" />
          <circle cx="16" cy="16" r="3" fill="rgba(108,92,231,0.8)" />
        </svg>
        Remallow
      </a>
      <div className="navbar-actions">
        <div className="github-btn-wrap">
          <GitHubButton
            href="https://github.com/yokesharun/remallow"
            data-size="large"
            data-show-count="true"
            aria-label="Star yokesharun/remallow on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
