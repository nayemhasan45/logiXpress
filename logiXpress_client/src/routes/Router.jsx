import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/auth/signIn/SignIn";
import SignUp from "../pages/auth/signUp/SignUp";
import RiderRegistation from "../pages/rider/riderReg/RiderRegistation";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "../pages/auth/forgetPass/ForgetPassword";
import Coverage from "../pages/covarage/Coverage";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcel from "../pages/dashboard/myParcel/MyParcel";

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
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/be-a-rider",
        element: (
          <PrivateRoute>
            <RiderRegistation></RiderRegistation>
          </PrivateRoute>
        ),
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
    ],
  },

  // auth related routes------------------------------
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
      {
        path: "/forgetPassword",
        Component: ForgetPassword,
      },
    ],
  },
  // User dashboard related routes----------------------- 
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "myParcels",
        element: <PrivateRoute><MyParcel></MyParcel></PrivateRoute>
      },
    ]
  }
]);
