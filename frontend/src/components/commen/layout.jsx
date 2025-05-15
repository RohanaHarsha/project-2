// Layout.js
import React from "react";
import Sidebar from "./sidebar"; // Update path as needed
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
