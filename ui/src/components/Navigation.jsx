import React from "react";
import GitHubButton from "react-github-btn";
// import logo from '../../assets/dark-logo.png'

const Navigation = () => {
  return (
    <nav
      className="navbar is-link nav-bar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://github.com/yokesharun/remallow">
          {/* <img src={logo} alt="" width="30" height="50" /> */}
          <h2 className="title nav-title">Remallow</h2>
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="field is-grouped">
            <p className="control">
              <GitHubButton
                href="https://github.com/yokesharun"
                data-size="large"
                aria-label="Follow @yokesharun on GitHub"
              >
                Follow @yokesharun
              </GitHubButton>
            </p>
            <p className="control">
              <GitHubButton
                href="https://github.com/yokesharun/remallow"
                data-size="large"
                data-show-count="true"
                aria-label="Star yokesharun/remallow on GitHub"
              >
                Star
              </GitHubButton>
            </p>
            <p className="control">
              <GitHubButton
                href="https://github.com/yokesharun/remallow/issues"
                data-size="large"
                aria-label="Issue yokesharun/remallow on GitHub"
              >
                Report Issue
              </GitHubButton>
            </p>
            {/* <p className="control">
              <a
                className="bd-tw-button button is-danger is-light"
                target="_blank"
                href="https://github.com/yokesharun/remallow"
              >
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
                <span>Github</span>
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
