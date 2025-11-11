import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from '../pages/shared/components/Loading';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show the Loading component while checking auth state
    return <Loading></Loading>;
  }

  if (!user) {
    // Redirect to SignIn if not authenticated
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected page
  return children;
};

export default PrivateRoute;
