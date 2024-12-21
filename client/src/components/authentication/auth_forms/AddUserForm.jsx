import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import * as userApi from "../../../utils/userApi";
import { toast } from "react-hot-toast"; // Import Hot Toast

const AddUserForm = ({ onSuccess }) => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    role: Yup.string().oneOf(["Provider", "Admin"], "Invalid role").required("Role is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "Provider",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
          await userApi.createUser(values); // Call API to create user
          toast.success("User added successfully!"); // Success notification

          resetForm(); // Reset the form

          if (onSuccess) onSuccess(); // Callback for success
          navigate("/dashboard"); // Navigate after success
        } catch (err) {
          toast.error(
            `Failed to add user: ${
              err.response?.data?.error || "An unexpected error occurred."
            }`
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Add User
            </Typography>

            <Field
              as={TextField}
              label="Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
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

            <Field
              as={TextField}
              label="Role"
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.role && Boolean(errors.role)}
              helperText={touched.role && errors.role}
              select
              fullWidth
              margin="normal"
            >
              <MenuItem value="Provider">Provider</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Field>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add User"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddUserForm;
