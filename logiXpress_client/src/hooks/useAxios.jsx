import axios from 'axios';
import React from 'react';

const apiCall = axios.create({
    baseURL:'http://localhost:3000',
})
const useAxios = () => {
    
    return apiCall
};

export default useAxios;