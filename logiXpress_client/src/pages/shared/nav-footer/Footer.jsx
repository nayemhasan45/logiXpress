import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/footerLogo.png";

const Footer = () => {
  return (
    <div data-aos="zoom-in" className="pb-5 md:pb-10">
      <footer className="bg-neutral text-neutral-content py-16 px-6 rounded-4xl">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center  space-y-5 md:space-y-6">
          {/* Logo */}
          <img
            src={logo}
            alt="LogiXpress Logo"
            className="w-32 sm:w-32 md:w-80 h-auto mb-2"
          />

          {/* Company Name */}
          <p className="font-semibold text-lg md:text-xl">KH Industries Ltd.</p>

          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed text-gray-300 max-w-md sm:max-w-lg">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          {/* Social Media Icons */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://www.facebook.com/nayemhasan450"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-[#caeb66] hover:text-black transition-colors duration-300 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-[#caeb66] hover:text-black transition-colors duration-300 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-[#caeb66] hover:text-black transition-colors duration-300 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/nayemhasan45/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-[#caeb66] hover:text-black transition-colors duration-300 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} LogiXpress. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
