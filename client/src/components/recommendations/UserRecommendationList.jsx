import React, { useEffect, useState } from 'react';
import {
    fetchUserRecommendations,
    createUserRecommendation,
    deleteUserRecommendation,
} from '../../utils/UserRecommendationApi';

import { fetchRecommendations } from '../../utils/recommendationApi'; 
import { fetchUsers } from '../../utils/userApi'; 
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    CircularProgress
} from '@mui/material';
import toast from 'react-hot-toast';

const UserRecommendationList = () => {
    const [userRecommendations, setUserRecommendations] = useState([]);
    const [users, setUsers] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedRecommendation, setSelectedRecommendation] = useState('');
    const [loading, setLoading] = useState(true);

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const usersData = await fetchUsers();
                const recommendationsData = await fetchRecommendations();
                const userRecommendationsData = await fetchUserRecommendations();

                setUsers(usersData);
                setRecommendations(recommendationsData);
                setUserRecommendations(userRecommendationsData);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load data.');
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Add Recommendation
    const handleAddRecommendation = async () => {
        if (!selectedUser || !selectedRecommendation) {
            toast.error('Please select both user and recommendation.');
            return;
        }

        // Prevent duplicates
        const exists = userRecommendations.some(
            (ur) =>
                ur.user_id === selectedUser && ur.recommendation_id === selectedRecommendation
        );
        if (exists) {
            toast.error('This recommendation already exists for the user.');
            return;
        }

        try {
            await createUserRecommendation(selectedUser, selectedRecommendation);
            toast.success('User recommendation added successfully!');
            const updatedRecommendations = await fetchUserRecommendations();
            setUserRecommendations(updatedRecommendations);
        } catch (error) {
            toast.error('Failed to add user recommendation.');
        }
    };

    // Delete Recommendation
    const handleDeleteRecommendation = async (userId, recommendationId) => {
        try {
            await deleteUserRecommendation(userId, recommendationId);
            toast.success('User recommendation deleted successfully!');
            const updatedRecommendations = await fetchUserRecommendations();
            setUserRecommendations(updatedRecommendations);
        } catch (error) {
            toast.error('Failed to delete user recommendation.');
        }
    };

    // Loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '1rem' }}>
            <h2>User Recommendations</h2>

            {/* Dropdowns for selecting user and recommendation */}
            <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
                <InputLabel>User</InputLabel>
                <Select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
                <InputLabel>Recommendation</InputLabel>
                <Select
                    value={selectedRecommendation}
                    onChange={(e) => setSelectedRecommendation(e.target.value)}
                >
                    {recommendations.map((rec) => (
                        <MenuItem key={rec.id} value={rec.id}>
                            {rec.text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="contained" onClick={handleAddRecommendation}>
                Add Recommendation
            </Button>

            {/* Display user recommendations */}
            <ul style={{ marginTop: '1rem' }}>
                {userRecommendations.map((ur) => (
                    <li key={`${ur.user_id}-${ur.recommendation_id}`}>
                        User {ur.user_id} - Recommendation {ur.recommendation_id}
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginLeft: '1rem' }}
                            onClick={() =>
                                handleDeleteRecommendation(ur.user_id, ur.recommendation_id)
                            }
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default UserRecommendationList;


