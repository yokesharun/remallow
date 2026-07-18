import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import List from "../components/List";
import Manager from "../components/Manager";
import { ToastProvider } from "../contexts/ToastContext";

const Layout = () => {
  const [manager, setManager] = useState(localStorage.getItem("manager"));
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ToastProvider>
      <Navigation theme={theme} setTheme={setTheme} />
      {!manager ? (
        <Manager setManager={setManager} />
      ) : (
        <List manager={manager} setManager={setManager} />
      )}
    </ToastProvider>
  );
};

export default Layout;
