import api from './apiConfig';


// Fetch all user recommendations
export const fetchUserRecommendations = async () => {
    try {
        const { data } = await api.get('/user_recommendations');
        return data;
    } catch (error) {
        console.error('Failed to fetch user recommendations:', error);
        throw error;
    }
};

// Fetch recommendations by user ID
export const fetchUserRecommendationsByUserId = async (userId) => {
    try {
        const { data } = await api.get(`/user_recommendations?user_id=${userId}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch recommendations for user ${userId}:`, error);
        throw error;
    }
};

// Create a new user recommendation
export const createUserRecommendation = async (userId, recommendationId) => {
    try {
        const payload = {
            user_id: userId,
            recommendation_id: recommendationId,
        };
        const { data } = await api.post('/user_recommendations', payload);
        return data;
    } catch (error) {
        console.error('Failed to create user recommendation:', error);
        throw error;
    }
};

// Delete a user recommendation
export const deleteUserRecommendation = async (userId, recommendationId) => {
    try {
        await api.delete('/user_recommendations', {
            data: {
                user_id: userId,
                recommendation_id: recommendationId,
            },
        });
        return { message: 'User recommendation deleted successfully.' };
    } catch (error) {
        console.error('Failed to delete user recommendation:', error);
        throw error;
    }
};


