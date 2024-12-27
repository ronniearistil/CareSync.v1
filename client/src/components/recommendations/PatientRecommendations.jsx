import React, { useEffect, useState } from "react";
import {
  fetchPatients,
  fetchPatientRecommendations,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
} from "../../utils/patientApi";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientRecommendations = () => {
  // States
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentRec, setCurrentRec] = useState({ id: null, text: "" });
  const [deleteId, setDeleteId] = useState(null);

  // Load patients on mount
  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const patientsData = await fetchPatients();
        setPatients(patientsData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load patients.");
        setLoading(false);
      }
    };
    loadPatients();
  }, []);

  // Fetch recommendations for selected patient
  const loadRecommendations = async (patientId) => {
    try {
      const data = await fetchPatientRecommendations(patientId);
      setRecommendations(data);
    } catch (error) {
      toast.error("Failed to load recommendations.");
    }
  };

  // Handle dropdown change
  const handlePatientChange = async (e) => {
    const patientId = e.target.value;
    setSelectedPatient(patientId);
    await loadRecommendations(patientId);
  };

  // Handle save (add/edit)
  const handleSaveRecommendation = async () => {
    try {
      if (currentRec.id) {
        // Update recommendation
        await updateRecommendation(currentRec.id, { text: currentRec.text });
        toast.success("Recommendation updated!");
      } else {
        // Create new recommendation
        const newRec = await createRecommendation({
          patient_id: selectedPatient,
          text: currentRec.text,
        });
        setRecommendations([...recommendations, newRec]);
        toast.success("Recommendation added!");
      }

      setDialogOpen(false);
      setCurrentRec({ id: null, text: "" });
      await loadRecommendations(selectedPatient);
    } catch (error) {
      toast.error("Failed to save recommendation.");
    }
  };

  // Handle delete confirmation
  const handleDeleteRecommendation = async () => {
    try {
      await deleteRecommendation(deleteId);
      toast.success("Recommendation deleted!");
      await loadRecommendations(selectedPatient);
    } catch (error) {
      toast.error("Failed to delete recommendation.");
    } finally {
      setDeleteConfirmOpen(false);
    }
  };

  // Loading state
  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: "2rem" }}>
      <ToastContainer />
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Patient Recommendations
      </Typography>

      {/* Patient Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
  <InputLabel shrink></InputLabel>
  <Select
    value={selectedPatient || ""}
    onChange={handlePatientChange}
    displayEmpty
  >
    <MenuItem value="">
      <em>Select a Patient</em>
    </MenuItem>
    {patients.map((patient) => (
      <MenuItem key={patient.id} value={patient.id}>
        {patient.name || `Patient ${patient.id}`}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      {/* Recommendations List */}
      {recommendations.map((rec) => (
        <Accordion key={rec.id} sx={{ marginBottom: "1rem" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Recommendation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ marginBottom: "1rem" }}>{rec.text}</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <IconButton
                onClick={() => {
                  setCurrentRec(rec);
                  setDialogOpen(true);
                }}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDeleteId(rec.id);
                  setDeleteConfirmOpen(true);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setCurrentRec({ id: null, text: "" });
                  setDialogOpen(true);
                }}
                color="success"
              >
                <AddIcon />
              </IconButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Dialog for Add/Edit */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {currentRec.id ? "Edit Recommendation" : "Add Recommendation"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={currentRec.text}
            onChange={(e) =>
              setCurrentRec({ ...currentRec, text: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveRecommendation}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this recommendation? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteRecommendation} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientRecommendations;





