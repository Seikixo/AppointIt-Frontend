import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export const getCsrfToken = () => api.get('/sanctum/csrf-cookie');

export const loginUser = (data: {
    email: string;
    password: string;
}) => api.post('/api/login', data);

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;    
}) => api.post('/api/register', data);

export const logoutUser = () => api.post('/api/logout');

export const getUser = () => api.get('/api/user');