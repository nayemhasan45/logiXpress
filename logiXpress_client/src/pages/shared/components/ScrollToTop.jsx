import { useEffect } from "react";
import { useLocation } from "react-router";


const ScrollToTop = () => {
  const { pathname } = useLocation(); // listens for route changes

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // 🔹 smooth scrolling
    });
  }, [pathname]); // runs whenever the route changes

  return null; // no UI
};

export default ScrollToTop;
