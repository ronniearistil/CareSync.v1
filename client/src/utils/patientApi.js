import api from './apiConfig';

// Generic error handler
const handleError = (error, message) => {
    console.error(`${message}:`, error);
    throw error;
};

// Fetch all patients
export const fetchPatients = async () => {
    try {
        const { data } = await api.get('/patients');
        return data;
    } catch (error) {
        handleError(error, 'Failed to fetch patients');
    }
};

// Fetch a specific patient by ID
export const fetchPatientById = async (id) => {
    try {
        const { data } = await api.get(`/patients/${id}`);
        return data;
    } catch (error) {
        handleError(error, `Failed to fetch patient with ID ${id}`);
    }
};

// Create a new patient
export const createPatient = async (patient) => {
    try {
        const { data } = await api.post('/patients', patient);
        return data;
    } catch (error) {
        handleError(error, 'Failed to create patient');
    }
};

// Update a patient using PUT (Full Update)
export const updatePatient = async (id, patient) => {
    try {
        const { data } = await api.put(`/patients/${id}`, patient);
        return data;
    } catch (error) {
        handleError(error, `Failed to update patient with ID ${id}`);
    }
};

// Update a patient using PATCH (Partial Update)
export const patchPatient = async (id, patient) => {
    try {
        const { data } = await api.patch(`/patients/${id}`, patient);
        return data;
    } catch (error) {
        handleError(error, `Failed to partially update patient with ID ${id}`);
    }
};

// Delete a patient
export const deletePatient = async (id) => {
    try {
        await api.delete(`/patients/${id}`);
        return { message: `Patient with ID ${id} deleted successfully.` };
    } catch (error) {
        handleError(error, `Failed to delete patient with ID ${id}`);
    }
};

// Fetch patient recommendations by patient ID
export const fetchPatientRecommendations = async (patientId) => {
    try {
        const { data } = await api.get(`/recommendations?patient_id=${patientId}`);
        return data;
    } catch (error) {
        handleError(error, `Failed to fetch recommendations for patient ID ${patientId}`);
    }
};

// Create a recommendation for a patient
export const createRecommendation = async (payload) => {
    try {
        const { data } = await api.post('/recommendations', payload);
        return data;
    } catch (error) {
        handleError(error, 'Failed to create recommendation');
    }
};

// Update a recommendation
export const updateRecommendation = async (id, payload) => {
    try {
        const { data } = await api.put(`/recommendations/${id}`, payload);
        return data;
    } catch (error) {
        handleError(error, `Failed to update recommendation with ID ${id}`);
    }
};

// Delete a recommendation
export const deleteRecommendation = async (id) => {
    try {
        await api.delete(`/recommendations/${id}`);
        return { message: `Recommendation with ID ${id} deleted successfully.` };
    } catch (error) {
        handleError(error, `Failed to delete recommendation with ID ${id}`);
    }
};

