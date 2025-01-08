import axios from 'axios';

const api = axios.create({
    baseURL: 'https://caresynq-7ykc.onrender.com', // Confirm backend URL
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            console.error("No response from API:", error.request);
        } else {
            console.error("Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;



