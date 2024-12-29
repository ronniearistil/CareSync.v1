import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import * as healthRecordApi from "../../utils/healthRecordApi";

const CareDetails = () => {
  const { patientId } = useParams();
  const [healthRecords, setHealthRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const loadHealthRecords = async () => {
      try {
        const data = await healthRecordApi.fetchHealthRecordsForPatient(patientId);
        setHealthRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error("Error fetching health records:", error);
        setError("Failed to load health records. Please try again.");
      }
    };

    loadHealthRecords();
  }, [patientId]);

  // Filter records by type or status
  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setFilter(selectedType);

    if (selectedType === "All") {
      setFilteredRecords(healthRecords);
    } else if (["Completed", "Upcoming", "Overdue"].includes(selectedType)) {
      setFilteredRecords(
        healthRecords.filter((record) => record.status === selectedType)
      );
    } else {
      setFilteredRecords(
        healthRecords.filter((record) => record.type === selectedType)
      );
    }
  };

  // Handle add new record
  const handleAddNew = async (values, { resetForm }) => {
    try {
      const payload = {
        type: values.type,
        status: values.status,
        notes: values.notes || null,
        user_id: 1,
        patient_id: patientId,
      };

      const newRecord = await healthRecordApi.createHealthRecord(payload);
      setHealthRecords((prev) => [...prev, newRecord]);
      setFilteredRecords((prev) => [...prev, newRecord]);
      resetForm();
      setIsAdding(false);
      toast.success("Health record added successfully!");
    } catch (error) {
      console.error("Error adding health record:", error);
      toast.error("Failed to add health record. Please try again.");
    }
  };

  // Handle edit dialog
  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsEditing(true);
  };

  // Handle edit functionality
  const handleEditSubmit = async (values) => {
    try {
      await healthRecordApi.updateHealthRecord(selectedRecord.id, values);
      setHealthRecords((prev) =>
        prev.map((rec) => (rec.id === selectedRecord.id ? { ...rec, ...values } : rec))
      );
      setFilteredRecords((prev) =>
        prev.map((rec) => (rec.id === selectedRecord.id ? { ...rec, ...values } : rec))
      );
      setIsEditing(false);
      toast.success("Health record updated successfully!");
    } catch (error) {
      console.error("Error updating health record:", error);
      setError("Failed to update health record. Please try again.");
      toast.error("Failed to update health record. Please try again.");
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      await healthRecordApi.deleteHealthRecord(selectedRecord.id);
      setHealthRecords((prev) => prev.filter((rec) => rec.id !== selectedRecord.id));
      setFilteredRecords((prev) => prev.filter((rec) => rec.id !== selectedRecord.id));
      toast.success("Health record deleted successfully!");
    } catch (error) {
      console.error("Error deleting health record:", error);
      setError("Failed to delete health record. Please try again.");
      toast.error("Failed to delete health record. Please try again.");
    } finally {
      setIsDeleteConfirmationOpen(false);
      setSelectedRecord(null);
    }
  };

  // Validation schema
  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    status: Yup.string().required("Status is required"),
    notes: Yup.string().max(255, "Notes must be under 255 characters"),
  });

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Toast Notifications */}

      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
        Care Details
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: "1rem" }}>
          {error}
        </Typography>
      )}

      {/* Filter Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
        <InputLabel>Filter by Type or Status</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Filter by Type or Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Vaccine">Vaccine</MenuItem>
          <MenuItem value="Procedure">Procedure</MenuItem>
          <MenuItem value="Screening">Screening</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Upcoming">Upcoming</MenuItem>
          <MenuItem value="Overdue">Overdue</MenuItem>
        </Select>
      </FormControl>

      {/* Health Records */}
      {filteredRecords.map((record) => (
        <Accordion key={record.id} sx={{ marginBottom: "1rem" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: "bold" }}>
              {record.type} ({record.status})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "1rem" }}>
              {record.notes || "No additional notes provided."}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <IconButton onClick={() => handleEdit(record)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setSelectedRecord(record);
                  setIsDeleteConfirmationOpen(true);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => setIsAdding(true)} color="success">
                <AddIcon />
              </IconButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Add/Edit Dialog */}
      <Dialog open={isEditing || isAdding} onClose={() => (isEditing ? setIsEditing(false) : setIsAdding(false))}>
        <DialogTitle>{isEditing ? "Edit Health Record" : "Add New Health Record"}</DialogTitle>
        <Formik
          initialValues={
            isEditing ? selectedRecord : { type: "", status: "", notes: "" }
          }
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            if (isEditing) {
              handleEditSubmit(values);
            } else {
              handleAddNew(values, actions);
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Field
                  name="type"
                  as={TextField}
                  label="Type"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="type" />}
                />
                <Field
                  name="status"
                  as={TextField}
                  label="Status"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="status" />}
                />
                <Field
                  name="notes"
                  as={TextField}
                  label="Notes"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="notes" />}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => (isEditing ? setIsEditing(false) : setIsAdding(false))}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {isEditing ? "Save Changes" : "Add Record"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this health record? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmationOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CareDetails;






