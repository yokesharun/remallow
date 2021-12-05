import React from "react";
import GitHubButton from "react-github-btn";

const Navigation = () => {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <h2 className="title">Remallow</h2>
          {/* <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" /> */}
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <GitHubButton
                href="https://github.com/yokesharun"
                data-size="large"
                aria-label="Follow @yokesharun on GitHub"
              >
                Follow @yokesharun
              </GitHubButton>
            </p>
            <p class="control">
              <GitHubButton
                href="https://github.com/yokesharun/remallow"
                data-size="large"
                data-show-count="true"
                aria-label="Star yokesharun/remallow on GitHub"
              >
                Star
              </GitHubButton>
            </p>
            <p class="control">
              <GitHubButton
                href="https://github.com/yokesharun/remallow/issues"
                data-size="large"
                aria-label="Issue yokesharun/remallow on GitHub"
              >
                Report Issue
              </GitHubButton>
            </p>
            {/* <p class="control">
              <a
                class="bd-tw-button button is-danger is-light"
                target="_blank"
                href="https://github.com/yokesharun/remallow"
              >
                <span class="icon">
                  <i class="fab fa-github"></i>
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
