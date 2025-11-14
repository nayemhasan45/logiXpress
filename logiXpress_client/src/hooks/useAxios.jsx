import axios from 'axios';
import useAuth from './useAuth';
import { useMemo } from 'react';

const useAxios = () => {
  const { user } = useAuth(); // get user info from auth

  const apiCall = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
        ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
      },
    });
  }, [user]);

  return apiCall;
};

export default useAxios;
