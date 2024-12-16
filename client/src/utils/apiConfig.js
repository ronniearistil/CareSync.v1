// import axios from 'axios';
// 
// const api = axios.create({
//     baseURL: 'http://localhost:5555',
//     withCredentials: true,
// });
// 
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             if (error.response.status === 401) {
//                 console.error("Unauthorized! Redirecting to login.");
//                 window.location.href = "/login";
//             } else {
//                 console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
//             }
//         } else if (error.request) {
//             console.error("No response received from API:", error.request);
//         } else {
//             console.error("Error setting up request:", error.message);
//         }
//         return Promise.reject(error);
//     }
// );
// 
// export default api;


// Debugging for role base

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5555',
    withCredentials: true,
});

// Attach Token for Authenticated Requests
api.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem("access_token");
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle API Errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                console.error("Unauthorized! Redirecting to login.");
                localStorage.clear();
                window.location.href = "/login";
            } else if (status === 403) {
                console.error("Forbidden: Access denied.");
                alert("You do not have permission to access this resource.");
            } else {
                console.error(`API Error: ${status} - ${error.response.data?.error || error.message}`);
            }
        } else {
            console.error("Network Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
