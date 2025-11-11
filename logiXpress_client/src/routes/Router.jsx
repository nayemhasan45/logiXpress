import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/auth/signIn/SignIn";
import SignUp from "../pages/auth/signUp/SignUp";
import RiderRegistation from "../pages/rider/riderReg/RiderRegistation";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <RiderRegistation></RiderRegistation>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/signIn",
        Component: SignIn,
      },
      {
        path: "/signUp",
        Component: SignUp,
      },
    ],
  },
]);
