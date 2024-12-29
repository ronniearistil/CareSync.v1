import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled Paper container
const FormContainer = styled(Paper)({
  maxWidth: "500px",
  margin: "2rem auto",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
});

const UserRegisterPage = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["Admin", "Provider"], "Role must be Admin or Provider")
      .required("Role is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5555/auth/register", values);
      if (response.status === 201) {
        toast.success("User account created successfully!");
        resetForm();
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to register user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer elevation={3}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976D2" }}
      >
        User Sign Up
      </Typography>
      <Formik
        initialValues={{ name: "", email: "", password: "", role: "Provider" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                required
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                type="email"
                fullWidth
                required
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="role"
                label="Role"
                select
                fullWidth
                required
                error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}
              >
                <MenuItem value="Provider">Provider</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Field>
            </Box>
            <Box mt={3} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default UserRegisterPage;






