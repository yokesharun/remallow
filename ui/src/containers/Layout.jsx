import React, { useState } from "react";
import Navigation from "../components/Navigation";
import List from "../components/List";
import Manager from "../components/Manager";
import _ from "lodash";
import "./style.css";

const Layout = () => {
  const [manager, setManager] = useState(localStorage.getItem("manager"));
  return (
    <>
      <Navigation />
      <div className="container is-max-widescreen">
        {_.isEmpty(manager) ? (
          <Manager setManager={setManager} />
        ) : (
          <List manager={manager} setManager={setManager} />
        )}
      </div>
    </>
  );
};

export default Layout;
