import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-app-726j.onrender.com/api',
});

// Add a request interceptor to attach JWT token to auth requests
api.interceptors.request.use(
    (config) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            if (user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
