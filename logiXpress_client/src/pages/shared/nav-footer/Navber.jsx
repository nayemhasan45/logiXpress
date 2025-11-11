import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import { MdArrowOutward } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaMotorcycle } from "react-icons/fa";
import Swal from "sweetalert2";

const Navber = () => {
  const { user, signOutUser } = useAuth();
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Have To Sign In Again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "Sign out!",
              text: "You Have Successfully Loged Out.",
              icon: "success",
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Unexpected Error Happend , Please Try Again Latter",
              icon: "error",
              confirmButtonText: "sorry",
            });
          });
      }
    });
  };
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
    <div className="py-5 md:py-10 max-w-11/12 mx-auto ">
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
              {/* Be a Rider button for mobile - at the bottom */}
              <li className="mt-2">
                <Link
                  to="/be-a-rider"
                  className="group flex items-center gap-2 rounded-full bg-[#CAEB66] px-3 py-2 text-sm font-semibold text-gray-800 shadow-md transition-all duration-300 hover:bg-[#b5d85a] hover:shadow-lg active:scale-95"
                >
                  <FaMotorcycle
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span>Be a Rider</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <img
              src={logo}
              alt="LogiXpress Logo"
              className="w-16 sm:w-24 md:w-28 lg:w-32 h-auto transition-transform duration-300 hover:scale-105 hover:drop-shadow-md cursor-pointer"
            />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end gap-2 md:gap-3">
          {/* be a rider - hidden on mobile, visible on lg and above */}
          <Link
            to="/be-a-rider"
            className="hidden lg:flex group items-center gap-2 rounded-full bg-[#CAEB66] px-4 py-2 text-sm font-semibold text-gray-800 shadow-md transition-all duration-300 hover:bg-[#b5d85a] hover:shadow-lg active:scale-95 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
          >
            <FaMotorcycle
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
            <span>Be a Rider</span>
          </Link>
          {user ? (
            // Show Sign Out if user exists
            <button
              onClick={handleSignOut}
              className="group flex items-center gap-2 rounded-full bg-[#CAEB66] px-3 py-1.5 text-xs font-semibold text-secondary shadow-md transition-all duration-300 hover:bg-[#b5d85a] hover:shadow-lg active:scale-95 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
            >
              <span>Sign Out</span>
              <FiLogOut
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1 sm:w-[18px] sm:h-[18px]"
              />
            </button>
          ) : (
            // Show Sign In if no user
            <Link
              to="/signIn"
              className="group flex items-center gap-2 rounded-full bg-[#CAEB66] px-3 py-1.5 text-xs font-semibold text-secondary shadow-md transition-all duration-300 hover:bg-[#b5d85a] hover:shadow-lg active:scale-95 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
            >
              <span>Sign In</span>
              <MdArrowOutward
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1 sm:w-[18px] sm:h-[18px]"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
