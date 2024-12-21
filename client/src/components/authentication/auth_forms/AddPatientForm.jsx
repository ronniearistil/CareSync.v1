import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import * as patientApi from "../../../utils/patientApi";
import { toast } from "react-hot-toast";

const AddPatientForm = ({ mode, onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    password: "",
  });

  // Validation schema using Yup
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone_number: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    password: mode !== "replace" ? Yup.string().required("Password is required") : Yup.string(),
  });

  // Fetch patient data if in replace mode
  useEffect(() => {
    if (mode === "replace" && id) {
      const fetchPatient = async () => {
        try {
          const data = await patientApi.fetchPatientById(id);
          setInitialValues({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            phone_number: data.phone_number || "",
            date_of_birth: data.date_of_birth || "",
            address: data.address || "",
            password: "", // Password not returned for security
          });
        } catch (error) {
          toast.error("Failed to load patient details.");
        }
      };
      fetchPatient();
    }
  }, [id, mode]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const payload = {
            first_name: values.first_name.trim(),
            last_name: values.last_name.trim(),
            email: values.email.trim().toLowerCase(),
            phone_number: values.phone_number.trim(),
            date_of_birth: new Date(values.date_of_birth).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }), // Format to MM/DD/YYYY
            address: values.address.trim(),
            ...(mode !== "replace" && { password: values.password.trim() }), // Include password if adding
          };

          if (mode === "replace" && id) {
            await patientApi.updatePatient(id, payload);
            toast.success("Patient updated successfully!");
          } else {
            await patientApi.createPatient(payload);
            toast.success("Patient added successfully!");
          }

          if (onSuccess) onSuccess();
          navigate("/patients");
        } catch (error) {
          toast.error(
            error.response?.data?.error || "Failed to save patient details. Please try again."
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box sx={{ maxWidth: 400, mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
              {mode === "replace" ? "Replace Patient" : "Add Patient"}
            </Typography>

            <Field
              as={TextField}
              label="First Name"
              name="first_name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.first_name && Boolean(errors.first_name)}
              helperText={touched.first_name && errors.first_name}
              fullWidth
              margin="normal"
            />

            <Field
              as={TextField}
              label="Last Name"
              name="last_name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.last_name && Boolean(errors.last_name)}
              helperText={touched.last_name && errors.last_name}
              fullWidth
              margin="normal"
            />

            <Field
              as={TextField}
              label="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              margin="normal"
            />

            <Field
              as={TextField}
              label="Phone Number"
              name="phone_number"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone_number && Boolean(errors.phone_number)}
              helperText={touched.phone_number && errors.phone_number}
              fullWidth
              margin="normal"
            />

            <Field
              as={TextField}
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date_of_birth && Boolean(errors.date_of_birth)}
              helperText={touched.date_of_birth && errors.date_of_birth}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <Field
              as={TextField}
              label="Address"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
              fullWidth
              margin="normal"
            />

            {mode !== "replace" && (
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
                margin="normal"
              />
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddPatientForm;

