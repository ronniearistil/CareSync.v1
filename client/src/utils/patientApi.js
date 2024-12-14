import api from './apiConfig';

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

