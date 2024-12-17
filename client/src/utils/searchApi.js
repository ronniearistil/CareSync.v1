import api from './apiConfig';

export const searchGlobal = async (query) => {
    try {
        const { data } = await api.post('/auth/search', { query });
        return data;
    } catch (error) {
        console.error("Failed to execute search:", error);
        throw error;
    }
};



