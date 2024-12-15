import api from './apiConfig';

export const createUser = async (user) => {
    try {
        const { data } = await api.post('/users', user);
        return data;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
};

export const fetchUsers = async () => {
    try {
        const { data } = await api.get('/users');
        return data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
};

export const fetchUserById = async (id) => {
    try {
        const { data } = await api.get(`/users/${id}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch user with ID ${id}:`, error);
        throw error;
    }
};

export const updateUser = async (id, user) => {
    try {
        const { data } = await api.put(`/users/${id}`, user);
        return data;
    } catch (error) {
        console.error(`Failed to update user with ID ${id}:`, error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await api.delete(`/users/${id}`);
        return { message: `User with ID ${id} deleted successfully.` };
    } catch (error) {
        console.error(`Failed to delete user with ID ${id}:`, error);
        throw error;
    }
};
