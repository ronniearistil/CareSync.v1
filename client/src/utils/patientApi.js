import api from './apiConfig';

// Fetch all patients
export const fetchPatients = async () => {
    try {
        const { data } = await api.get('/patients');
        return data;
    } catch (error) {
        console.error('Failed to fetch patients:', error);
        throw error;
    }
};

// Fetch a specific patient by ID
export const fetchPatientById = async (id) => {
    try {
        const { data } = await api.get(`/patients/${id}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch patient with ID ${id}:`, error);
        throw error;
    }
};

// Create a new patient
export const createPatient = async (patient) => {
    try {
        const { data } = await api.post('/patients', patient);
        return data;
    } catch (error) {
        console.error('Failed to create patient:', error);
        throw error;
    }
};

// Update a patient using PUT (Full Update)
export const updatePatient = async (id, patient) => {
    try {
        const { data } = await api.put(`/patients/${id}`, patient);
        return data;
    } catch (error) {
        console.error(`Failed to update patient with ID ${id}:`, error);
        throw error;
    }
};

// Update a patient using PATCH (Partial Update)
export const patchPatient = async (id, patient) => {
    try {
        const { data } = await api.patch(`/patients/${id}`, patient);
        return data;
    } catch (error) {
        console.error(`Failed to partially update patient with ID ${id}:`, error);
        throw error;
    }
};

// Delete a patient
export const deletePatient = async (id) => {
    try {
        await api.delete(`/patients/${id}`);
        return { message: `Patient with ID ${id} deleted successfully.` };
    } catch (error) {
        console.error(`Failed to delete patient with ID ${id}:`, error);
        throw error;
    }
};

// Fetch all patient recommendations
export const fetchPatientRecommendations = async () => {
    try {
        const { data } = await api.get('/patients/recommendations');
        return data;
    } catch (error) {
        console.error('Failed to fetch patient recommendations:', error);
        throw error;
    }
};

