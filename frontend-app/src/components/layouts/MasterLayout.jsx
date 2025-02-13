import React from "react";
import NavBar from "../partials/NavBar";
import SideBar from "../partials/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../partials/Footer";

const MasterLayout = () => {
  return (
    <div>
      <NavBar />
      <div id="layoutSidenav">
        <SideBar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
