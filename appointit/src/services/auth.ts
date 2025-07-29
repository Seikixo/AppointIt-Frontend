import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
    // Get CSRF token from cookie
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized request - user may need to login');
        }
        return Promise.reject(error);
    }
);

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