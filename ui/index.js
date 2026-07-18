import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./src/styles/theme.css";
import "./src/styles/base.css";
import "./src/styles/animations.css";
import "./src/styles/components.css";
import Layout from "./src/containers/Layout";

ReactDOM.render(<Layout />, document.getElementById("root"));
