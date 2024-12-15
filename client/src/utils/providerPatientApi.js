import api from './apiConfig';

// Fetch all provider-patient relationships
export const fetchRelationships = async () => {
    try {
        const { data } = await api.get('/provider_patients');
        return data;
    } catch (error) {
        console.error('Failed to fetch provider-patient relationships:', error);
        throw error;
    }
};

// Fetch relationships for a specific provider
export const fetchPatientsForProvider = async (providerId) => {
    try {
        const { data } = await api.get(`/provider_patients?provider_id=${providerId}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch patients for provider with ID ${providerId}:`, error);
        throw error;
    }
};

// Fetch a specific provider-patient relationship
export const fetchRelationshipById = async (id) => {
    try {
        const { data } = await api.get(`/provider_patients/${id}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch relationship with ID ${id}:`, error);
        throw error;
    }
};
