import { useContext } from 'react';
import { AuthContext } from '../context/authContext/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.warn("useAuth must be used within an AuthProvider");
    return {}; // fallback empty object to avoid errors
  }

  return context;
};

export default useAuth;
