import React from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const NavBar = () => {
  const navigate = useNavigate();
  const handleSideBar = () => {
    $("body").toggleClass("sb-sidenav-toggled");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`logout`).then((res) => {
          if (res.data.status === 200) {
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/");
          }
        });
      }
    });
  };
  return (
    <div>
      <nav className="sb-topnav navbar navbar-expand navbar-dark my-navbar">
        <Link className="navbar-brand ps-3" to={"#"}>
          Inventory
        </Link>

        <button
          onClick={handleSideBar}
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
        >
          <i className="fas fa-bars"></i>
        </button>

        <ul className="navbar-nav align-items-center ms-auto me-3 me-lg-4">
          <p className="m-0 p-0 text-white">
            {localStorage.getItem("name") !== undefined
              ? localStorage.getItem("name")
              : null}
          </p>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              to={"#"}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item" to={"#!"}>
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"#!"}>
                  Activity Log
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
