import React from "react";
import Navigation from "../components/Navigation";
import List from "../components/List";
import "./style.css";

const Layout = () => {
  return (
    <>
      <Navigation />
      <div className="container is-max-widescreen">
        <List />
      </div>
    </>
  );
};

export default Layout;
