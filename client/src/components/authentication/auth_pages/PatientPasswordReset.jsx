import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, TextField, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const PatientPasswordReset = () => {
  const initialValues = { email: "", new_password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    new_password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5555/auth/patients/reset_password", values);
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Reset Patient Password
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  helperText={<ErrorMessage name="email" />}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  name="new_password"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  helperText={<ErrorMessage name="new_password" />}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default PatientPasswordReset;


