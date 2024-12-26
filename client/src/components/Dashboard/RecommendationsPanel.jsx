import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { fetchPatientRecommendations } from "../../utils/patientApi";
import toast from "react-hot-toast";

const RecommendationsPanel = ({ patientId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                const data = await fetchPatientRecommendations(patientId);
                setRecommendations(data);
            } catch (error) {
                toast.error("Failed to load recommendations.");
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, [patientId]);

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", padding: "1rem" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: "1rem" }}>
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                Recommendations
            </Typography>
            {recommendations.length > 0 ? (
                recommendations.map((rec) => (
                    <Card key={rec.id} sx={{ marginBottom: "1rem" }}>
                        <CardContent>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                {rec.text}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {rec.category} - {rec.age_group}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No recommendations available.</Typography>
            )}
        </Box>
    );
};

export default RecommendationsPanel;
