import React from "react";
import { NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import Footer from "../pages/shared/nav-footer/Footer";

const DashboardLayout = () => {
  const handleLinkClick = () => {
    // Only close drawer on small devices
    if (window.innerWidth < 1024) {
      const drawerToggle = document.getElementById("my-drawer-2");
      if (drawerToggle) drawerToggle.checked = false;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="drawer lg:drawer-open flex-1">
        {/* Drawer toggle input */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 text-xl font-semibold">Dashboard</div>
          </div>

          {/* Page content */}
          <div className="flex-1 p-6 overflow-auto">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Logo */}
            <div className="flex items-center mb-4">
              <NavLink to={"/"} onClick={handleLinkClick}>
                <img
                  src={logo}
                  alt="LogiXpress Logo"
                  className="w-16 sm:w-24 md:w-28 lg:w-32 h-auto transition-transform duration-300 hover:scale-105 hover:drop-shadow-md cursor-pointer"
                />
              </NavLink>
            </div>

            <li>
              <NavLink to={"/dashboard"} onClick={handleLinkClick}>
                🏠 Dashboard Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/myParcels"} onClick={handleLinkClick}>
                📦 Parcels
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/profile"} onClick={handleLinkClick}>
                👤 Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/settings"} onClick={handleLinkClick}>
                ⚙️ Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

     
    </div>
  );
};

export default DashboardLayout;
