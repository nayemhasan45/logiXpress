import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Router.jsx";
import Aos from "aos";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router";

// Create a small wrapper component
function MainApp() {
  useEffect(() => {
    Aos.init({
      once: false, // whether animation should happen only once - while scrolling down
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      disableMutationObserver: false, // disables automatic mutations' detections
      mirror: true, // whether elements should animate out while scrolling past them
    });

    // Refresh AOS when component mounts
    Aos.refresh();
  }, []);

  return (
    <div className="bg-[#EAECED]">
      <div className="max-w-11/12 mx-auto urbanist">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

// Render your app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
