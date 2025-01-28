// Login.tsx (React Component)
import React, { useState } from 'react';
import { useLoginMutation } from '../../../services/authApi';
import { LoginUserDto } from '../../../services/authTypes';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/Reducers/authSlice';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginUserDto>({ email: '', password: '' });
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginMutation(loginData).unwrap();
      const { accessToken, refreshToken, user } = response;
      dispatch(login({ accessToken, refreshToken, user }));  // Ensure user has role
      // Redirect based on the role (if needed)
      if (user.role === 'admin') {
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/user/dashboard'); // Redirect to user dashboard
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          fullWidth
          type="password"
        />
        <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
