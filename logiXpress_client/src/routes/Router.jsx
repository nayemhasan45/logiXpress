import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/home/home/Home";
import SignIn from "../pages/auth/signIn/SignIn";
import SignUp from "../pages/auth/signUp/SignUp";
import ForgetPassword from "../pages/auth/forgetPass/ForgetPassword";
import RiderRegistation from "../pages/rider/riderReg/RiderRegistation";

import Coverage from "../pages/covarage/Coverage";
import MyParcel from "../pages/dashboard/myParcel/MyParcel";

import PrivateRoute from "./PrivateRoute";
import CreateParcel from "../pages/dashboard/createParcel/CreateParcel";
import EditParcel from "../pages/dashboard/editParcel/EditParcel";
import DashProfile from "../pages/dashboard/profile/DashProfile";
import DashSettings from "../pages/dashboard/settings/DashSettings";
import DashHome from "../pages/dashboard/home/DashHome";

export const router = createBrowserRouter([
  // PUBLIC
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "coverage", element: <Coverage /> },
      {
        path: "be-a-rider", element: (
          <PrivateRoute>
            <RiderRegistation />
          </PrivateRoute>
        ),
      },
    ],
  },

  // AUTH
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },

  // DASHBOARD
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, element: <DashHome></DashHome>
      },
      {
        path: "myParcels", element: <MyParcel />
      },
      {
        path: "createParcel", element: <CreateParcel></CreateParcel>

      },         // new
      {
        path: "editParcel/:id", element: <EditParcel></EditParcel>

      },     // edit
      {
        path: "profile", element: <DashProfile></DashProfile>

      },
      {
        path: "settings", element: <DashSettings></DashSettings>
      },
    ],
  },
]);
