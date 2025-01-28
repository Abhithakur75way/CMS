import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useRegisterMutation } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// Schema validation with Yup
const schema = object({
  username: string().required("Username is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref('password')], "Passwords must match"),
  role: string()
    .oneOf(["user", "admin"], "Role must be either user or admin")
    .required("Role is required"),
});

const Register: React.FC = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await registerMutation(data).unwrap();
      navigate("/login"); // Redirect to login after successful registration
    } catch (err: any) {
      setError(err.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        mt={8}
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            {...register("username")}
            fullWidth
            margin="normal"
            required
            error={!!errors.username}
            helperText={errors.username?.message}
            autoFocus
          />
          <TextField
            label="Email"
            {...register("email")}
            fullWidth
            margin="normal"
            required
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            {...register("password")}
            fullWidth
            margin="normal"
            required
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            {...register("confirmPassword")}
            fullWidth
            margin ="normal"
            required
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          {/* Role Selection */}
          <FormControl fullWidth margin="normal" required error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              {...register("role")}
              defaultValue="user" // Default to 'user'
            >
              <MenuItem value="user">User </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {errors.role && (
              <span style={{ color: "red" }}>{errors.role.message}</span>
            )}
          </FormControl>

          <Box mt={2} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;