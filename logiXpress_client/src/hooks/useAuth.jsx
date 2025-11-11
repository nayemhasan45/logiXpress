import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext/AuthContext';

const useAuth = () => {
    const authContext = useContext(AuthContext);
    return authContext
};

export default useAuth;