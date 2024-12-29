import React, { useEffect, useState } from 'react';
import { fetchUserRecommendationsByUserId } from '../../utils/UserRecommendationApi';
import { Box, Typography, List, ListItem, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

const RecommendationsDashboard = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                setLoading(true);

                // Fetch recommendations for the logged-in user
                const userRecommendations = await fetchUserRecommendationsByUserId(userId);

                setRecommendations(userRecommendations);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load recommendations.');
                setLoading(false);
            }
        };
        loadRecommendations();
    }, [userId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '1rem' }}>
            <Typography variant="h4" gutterBottom>
                Recommendations
            </Typography>
            {recommendations.length === 0 ? (
                <Typography>No recommendations assigned yet.</Typography>
            ) : (
                <List>
                    {recommendations.map((rec) => (
                        <ListItem key={rec.recommendation_id}>
                            <Typography>
                                {rec.text} - <strong>{rec.category}</strong>
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default RecommendationsDashboard;
