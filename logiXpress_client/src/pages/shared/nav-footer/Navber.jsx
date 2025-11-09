import React from "react";
import { NavLink } from "react-router";
import logo from "../../../assets/logo.png";

const Navber = () => {
  const navLink = (
    <>
      <NavLink className={"pr-5"} to={"/"}>
        <li>Home</li>
      </NavLink>
      <NavLink className={"pr-5"} to={"/aboutUs"}>
        <li>About Us</li>
      </NavLink>
      <NavLink className={"pr-5"} to={"/coverage"}>
        <li>Coverage</li>
      </NavLink>
      <NavLink className={"pr-5"} to={"/pricing"}>
        <li>Pricing</li>
      </NavLink>
    </>
  );
  return (
    <div className="py-5 md:py-10">
      <div className="navbar bg-base-100 shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLink}
            </ul>
          </div>
          <div className="flex items-center">
            <img src={logo} alt="LogiXpress Logo" className="w-32 h-auto" />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-[#CAEB66] px-8">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navber;
