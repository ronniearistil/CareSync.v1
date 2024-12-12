import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5555',
  withCredentials: true, // Include cookies
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
// Export existing API calls
export const fetchAnalytics = () => api.get('/analytics');
export const updateAnalytics = (id, data) => api.put(`/analytics/${id}`, data);

export const fetchAppointments = () => api.get('/appointments');
export const fetchAppointmentById = (id) => api.get(`/appointments/${id}`);
export const createAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

export const fetchPatients = () => api.get('/patients');
export const fetchPatientById = (id) => api.get(`/patients/${id}`);
export const createPatient = (data) => api.post('/patients', data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);
export const deletePatient = (id) => api.delete(`/patients/${id}`);

export const fetchNews = () => api.get('/news');
export const fetchNewsById = (id) => api.get(`/news/${id}`);
export const createNews = (data) => api.post('/news', data);
export const updateNews = (id, data) => api.put(`/news/${id}`);
export const deleteNews = (id) => api.delete(`/news/${id}`);

export const fetchRecommendations = () => api.get('/recommendations');
export const fetchRecommendationById = (id) => api.get(`/recommendations/${id}`);
export const createRecommendation = (data) => api.post('/recommendations', data);
export const updateRecommendation = (id, data) => api.put(`/recommendations/${id}`);
export const deleteRecommendation = (id) => api.delete(`/recommendations/${id}`);

export default api;