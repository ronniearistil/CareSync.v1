import api from './apiConfig';

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
