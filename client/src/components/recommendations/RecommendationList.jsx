import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  fetchRecommendations,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
} from "../../utils/recommendationApi";
import toast from "react-hot-toast";

const RecommendationList = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formValues, setFormValues] = useState({
    text: "",
    category: "",
    age_group: "",
  });

  // Fetch recommendations
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchRecommendations();
        setRecommendations(data);
      } catch (error) {
        toast.error("Failed to load recommendations.");
      }
    };
    loadRecommendations();
  }, []);

  // Handle opening the modal (edit or add)
  const handleOpen = (recommendation = null) => {
    if (recommendation) {
      setSelectedId(recommendation.id);
      setFormValues({
        text: recommendation.text,
        category: recommendation.category,
        age_group: recommendation.age_group,
      });
    } else {
      setSelectedId(null);
      setFormValues({ text: "", category: "", age_group: "" });
    }
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setFormValues({ text: "", category: "", age_group: "" });
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    try {
      if (selectedId) {
        await updateRecommendation(selectedId, formValues);
        toast.success("Recommendation updated successfully!");
      } else {
        await createRecommendation(formValues);
        toast.success("Recommendation created successfully!");
      }
      handleClose();
      const data = await fetchRecommendations();
      setRecommendations(data); // Refresh recommendations
    } catch (error) {
      toast.error("Failed to save recommendation.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteRecommendation(id);
      toast.success("Recommendation deleted successfully!");
      setRecommendations(recommendations.filter((rec) => rec.id !== id));
    } catch (error) {
      toast.error("Failed to delete recommendation.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recommendations</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Recommendation
      </Button>
      <List>
        {recommendations.map((rec) => (
          <ListItem key={rec.id} divider>
            <ListItemText
              primary={rec.text}
              secondary={`${rec.category} - ${rec.age_group}`}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleOpen(rec)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(rec.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedId ? "Edit Recommendation" : "Add Recommendation"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Text"
            fullWidth
            margin="normal"
            value={formValues.text}
            onChange={(e) => setFormValues({ ...formValues, text: e.target.value })}
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={formValues.category}
            onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
          />
          <TextField
            label="Age Group"
            fullWidth
            margin="normal"
            value={formValues.age_group}
            onChange={(e) =>
              setFormValues({ ...formValues, age_group: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecommendationList;
