import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as patientApi from "../../utils/patientApi";
import * as userApi from "../../utils/userApi";
import * as appointmentApi from "../../utils/appointmentApi";
import { toast } from "react-hot-toast";

const AddAppointmentForm = () => {
  const [patients, setPatients] = useState([]);
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");

  // Fetch Providers and Patients
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const users = await userApi.fetchUsers();
        const providerList = users.filter((user) => user.role === "Provider");
        setProviders(providerList);
      } catch (err) {
        console.error("Error fetching providers:", err);
      }
    };

    const loadPatients = async () => {
      try {
        const patientList = await patientApi.fetchPatients();
        setPatients(patientList);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patients.");
      }
    };

    loadProviders();
    loadPatients();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    status: Yup.string()
      .oneOf(["Scheduled", "Completed", "Cancelled", "Rescheduled"], "Invalid status")
      .required("Status is required"),
    location: Yup.string().required("Location is required"),
    user_id: Yup.string().required("Provider is required"),
    patient_id: Yup.string().required("Patient is required"),
  });

  const initialValues = {
    date: "",
    time: "",
    status: "Scheduled",
    location: "",
    user_id: "",
    patient_id: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setError("");
        try {
          console.log("Submitting appointment payload:", values);
          await appointmentApi.createAppointment(values);
          toast.success("Appointment created successfully!");
          resetForm();
        } catch (err) {
          console.error("Failed to create appointment:", err);
          toast.error("Failed to create appointment. Please try again.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box sx={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
            <Typography variant="h4" gutterBottom>
              Add Appointment
            </Typography>
            {error && <Typography color="error">{error}</Typography>}

            <Field
              as={TextField}
              fullWidth
              type="date"
              label="Date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date && errors.date}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />

            <Field
              as={TextField}
              fullWidth
              type="time"
              label="Time"
              name="time"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.time && Boolean(errors.time)}
              helperText={touched.time && errors.time}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />

            <Field
              as={TextField}
              fullWidth
              label="Location"
              name="location"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Field
                as={Select}
                name="status"
                value={initialValues.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.status && Boolean(errors.status)}
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Rescheduled">Rescheduled</MenuItem>
              </Field>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Provider</InputLabel>
              <Field
                as={Select}
                name="user_id"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.user_id && Boolean(errors.user_id)}
              >
                <MenuItem value="">Select Provider</MenuItem>
                {providers.map((provider) => (
                  <MenuItem key={provider.id} value={provider.id}>
                    {provider.name || `Provider ${provider.id}`}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Patient</InputLabel>
              <Field
                as={Select}
                name="patient_id"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.patient_id && Boolean(errors.patient_id)}
              >
                <MenuItem value="">Select Patient</MenuItem>
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.name || `Patient ${patient.id}`}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem" }}
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Appointment"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddAppointmentForm;
