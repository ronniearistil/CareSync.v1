import React, { useEffect, useState } from "react";
import { fetchPatientRecommendations } from "../../utils/patientApi"; // Adjust based on API
import { List, ListItem, ListItemText, Button, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

const PatientRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchPatientRecommendations(); // API call
        setRecommendations(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load patient recommendations.");
        setLoading(false);
      }
    };
    loadRecommendations();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <h1>Patient Recommendations</h1>
      <List>
        {recommendations.map((rec) => (
          <ListItem key={rec.id}>
            <ListItemText primary={rec.text} />
            <Button variant="outlined" color="error">Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientRecommendations;
