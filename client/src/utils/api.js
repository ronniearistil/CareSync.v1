import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:5555',
  withCredentials: true, // Include cookies with requests
});

// Set up response interceptors for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle unauthorized access
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login.");
        window.location.href = "/login";
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

// Analytics
export const fetchAnalytics = async () => {
  try {
    const { data } = await api.get('/analytics');
    return data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
};
export const updateAnalytics = async (id, data) => {
  try {
    const { data: updatedData } = await api.put(`/analytics/${id}`, data);
    return updatedData;
  } catch (error) {
    console.error(`Failed to update analytics with ID ${id}:`, error);
    throw error;
  }
};

// Appointments
export const fetchAppointments = async () => {
  try {
    const { data } = await api.get('/appointments');
    return data;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
};
export const fetchAppointmentById = async (id) => {
  try {
    const { data } = await api.get(`/appointments/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch appointment with ID ${id}:`, error);
    throw error;
  }
};
export const createAppointment = async (data) => {
  try {
    const { data: newAppointment } = await api.post('/appointments', data);
    return newAppointment;
  } catch (error) {
    console.error('Failed to create appointment:', error);
    throw error;
  }
};
export const updateAppointment = async (id, data) => {
  try {
    const { data: updatedAppointment } = await api.put(`/appointments/${id}`, data);
    return updatedAppointment;
  } catch (error) {
    console.error(`Failed to update appointment with ID ${id}:`, error);
    throw error;
  }
};
export const deleteAppointment = async (id) => {
  try {
    await api.delete(`/appointments/${id}`);
    return { message: `Appointment with ID ${id} deleted successfully.` };
  } catch (error) {
    console.error(`Failed to delete appointment with ID ${id}:`, error);
    throw error;
  }
};

// Patients
export const fetchPatients = async () => {
  try {
    const { data } = await api.get('/patients');
    return data;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    throw error;
  }
};
export const fetchPatientById = async (id) => {
  try {
    const { data } = await api.get(`/patients/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch patient with ID ${id}:`, error);
    throw error;
  }
};
export const createPatient = async (data) => {
  try {
    const { data: newPatient } = await api.post('/patients', data);
    return newPatient;
  } catch (error) {
    console.error('Failed to create patient:', error);
    throw error;
  }
};
export const updatePatient = async (id, data) => {
  try {
    const { data: updatedPatient } = await api.put(`/patients/${id}`, data);
    return updatedPatient;
  } catch (error) {
    console.error(`Failed to update patient with ID ${id}:`, error);
    throw error;
  }
};
export const deletePatient = async (id) => {
  try {
    await api.delete(`/patients/${id}`);
    return { message: `Patient with ID ${id} deleted successfully.` };
  } catch (error) {
    console.error(`Failed to delete patient with ID ${id}:`, error);
    throw error;
  }
};

// News
export const fetchNews = async () => {
  try {
    const { data } = await api.get('/news');
    return data;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw error;
  }
};
export const fetchNewsById = async (id) => {
  try {
    const { data } = await api.get(`/news/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch news with ID ${id}:`, error);
    throw error;
  }
};
export const createNews = async (data) => {
  try {
    const { data: newNews } = await api.post('/news', data);
    return newNews;
  } catch (error) {
    console.error('Failed to create news:', error);
    throw error;
  }
};
export const updateNews = async (id, data) => {
  try {
    const { data: updatedNews } = await api.put(`/news/${id}`, data);
    return updatedNews;
  } catch (error) {
    console.error(`Failed to update news with ID ${id}:`, error);
    throw error;
  }
};
export const deleteNews = async (id) => {
  try {
    await api.delete(`/news/${id}`);
    return { message: `News with ID ${id} deleted successfully.` };
  } catch (error) {
    console.error(`Failed to delete news with ID ${id}:`, error);
    throw error;
  }
};

// Recommendations
export const fetchRecommendations = async () => {
  try {
    const { data } = await api.get('/recommendations');
    return data;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw error;
  }
};
export const fetchRecommendationById = async (id) => {
  try {
    const { data } = await api.get(`/recommendations/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch recommendation with ID ${id}:`, error);
    throw error;
  }
};
export const createRecommendation = async (data) => {
  try {
    const { data: newRecommendation } = await api.post('/recommendations', data);
    return newRecommendation;
  } catch (error) {
    console.error('Failed to create recommendation:', error);
    throw error;
  }
};
export const updateRecommendation = async (id, data) => {
  try {
    const { data: updatedRecommendation } = await api.put(`/recommendations/${id}`, data);
    return updatedRecommendation;
  } catch (error) {
    console.error(`Failed to update recommendation with ID ${id}:`, error);
    throw error;
  }
};
export const deleteRecommendation = async (id) => {
  try {
    await api.delete(`/recommendations/${id}`);
    return { message: `Recommendation with ID ${id} deleted successfully.` };
  } catch (error) {
    console.error(`Failed to delete recommendation with ID ${id}:`, error);
    throw error;
  }
};

// Export the configured Axios instance
export default api;

