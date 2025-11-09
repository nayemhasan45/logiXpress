import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-[#EAECED]">
      <div className=" max-w-11/12 mx-auto urbanist">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
