import api from './apiConfig';

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
