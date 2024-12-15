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

// USERS
export const createUser = async (user) => {
  try {
    const { data } = await api.post('/users', user); // Maps to the backend `post` method
    return data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await api.get('/users'); // Fetches all users
    return data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}`); // Fetches a user by ID
    return data;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const { data } = await api.put(`/users/${id}`, user); // Updates a user by ID
    return data;
  } catch (error) {
    console.error(`Failed to update user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`); // Deletes a user by ID
    return { message: `User with ID ${id} deleted successfully.` };
  } catch (error) {
    console.error(`Failed to delete user with ID ${id}:`, error);
    throw error;
  }
};

// APPOINTMENTS
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

export const createAppointment = async (appointment) => {
  try {
    const { data } = await api.post('/appointments', appointment);
    return data;
  } catch (error) {
    console.error('Failed to create appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (id, appointment) => {
  try {
    const { data } = await api.put(`/appointments/${id}`, appointment);
    return data;
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

// PATIENTS
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

export const createPatient = async (patient) => {
  try {
    const { data } = await api.post('/patients', patient);
    return data;
  } catch (error) {
    console.error('Failed to create patient:', error);
    throw error;
  }
};

export const updatePatient = async (id, patient) => {
  try {
    const { data } = await api.put(`/patients/${id}`, patient);
    return data;
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

// NEWS
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

export const createNews = async (news) => {
  try {
    const { data } = await api.post('/news', news);
    return data;
  } catch (error) {
    console.error('Failed to create news:', error);
    throw error;
  }
};

export const updateNews = async (id, news) => {
  try {
    const { data } = await api.put(`/news/${id}`, news);
    return data;
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

// RECOMMENDATIONS
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

export const createRecommendation = async (recommendation) => {
  try {
    const { data } = await api.post('/recommendations', recommendation);
    return data;
  } catch (error) {
    console.error('Failed to create recommendation:', error);
    throw error;
  }
};

export const updateRecommendation = async (id, recommendation) => {
  try {
    const { data } = await api.put(`/recommendations/${id}`, recommendation);
    return data;
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

// ANALYTICS
export const fetchAnalytics = async () => {
  try {
    const { data } = await api.get('/analytics');
    return data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
};

export const updateAnalytics = async (id, analytics) => {
  try {
    const { data } = await api.put(`/analytics/${id}`, analytics);
    return data;
  } catch (error) {
    console.error(`Failed to update analytics with ID ${id}:`, error);
    throw error;
  }
};

// Export the configured Axios instance
export default api;