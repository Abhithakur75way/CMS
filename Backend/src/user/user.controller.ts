import { Request, Response } from 'express';
import { registerUser, loginUser, refreshAccessToken } from './user.service';
import { CreateUserDto, LoginUserDto, RefreshTokenDto } from './user.dto';

export const register = async (req: Request, res: Response) => {
  const userData: CreateUserDto = req.body;
  const user = await registerUser(userData);
  res.status(201).json({ message: 'User registered', user });
};

export const login = async (req: Request, res: Response) => {
    const loginData: LoginUserDto = req.body;
    try {
      const tokens = await loginUser (loginData);
      res.json({ message: 'Login successful', ...tokens });
    } catch (error: any) {
      // Handle the error gracefully
      res.status(401).json({ message: error.message || 'Login failed' });
    }
  };

export const refreshToken = async (req: Request, res: Response) => {
  const refreshData: RefreshTokenDto = req.body;
  const accessToken = await refreshAccessToken(refreshData);
  res.json({ accessToken });
};