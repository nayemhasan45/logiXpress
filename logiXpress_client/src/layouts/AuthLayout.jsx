import { Link, Outlet } from "react-router";
import logo from "../assets/logo.png"; 
import authImage from "../assets/assets/authImage.png"; 
import ScrollToTop from "../pages/shared/components/ScrollToTop";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Logo + Outlet on desktop, Logo + Image + Outlet on mobile */}
      <div className="w-full md:w-1/2 flex flex-col justify-start">
        {/* Mobile: Logo */}
        <div className="flex flex-col md:hidden items-start mb-4">
          <Link to="/" className="flex items-center mb-4">
            <img src={logo} alt="Logo" className="w-32" />
          </Link>
          {/* Mobile: Image */}
          <img
            src={authImage}
            alt="Auth Visual"
            className="w-full h-64 object-cover mb-4"
          />
        </div>

        {/* Desktop: Logo */}
        <div className="hidden md:flex items-start mb-8">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-32 md:w-80" />
          </Link>
        </div>

        {/* Outlet / Auth Form */}
        <div className="w-full mx-auto">
          <ScrollToTop></ScrollToTop>
          <Outlet />
        </div>
      </div>

      {/* Right side: Image (desktop only) */}
      <div className="hidden md:flex w-1/2 h-auto md:min-h-screen items-center justify-center bg-gray-100">
        <img
          src={authImage}
          alt="Auth Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
