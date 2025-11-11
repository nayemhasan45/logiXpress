import React from "react";
import { Outlet } from "react-router";
import Navber from "../pages/shared/nav-footer/Navber";
import Footer from "../pages/shared/nav-footer/Footer";
import ScrollToTop from "../pages/shared/components/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="">
      <div className="">
        <Navber></Navber>
        <ScrollToTop></ScrollToTop>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
