import axios from 'axios';

const api = axios.create({
    baseURL: 'https://caresynq-7ykc.onrender.com', // Updated Backend URL
    withCredentials: true, // Ensure credentials are included for CORS
});

// Intercept responses to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Unauthorized! Redirecting to login.");
                window.location.href = "/login"; // Redirect to login on unauthorized error
            } else {
                console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
            }
        } else if (error.request) {
            console.error("No response received from API:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;


