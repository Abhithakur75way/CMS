// user.service.ts
import bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { CreateUserDto, LoginUserDto, RefreshTokenDto } from './user.dto';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/token.utils';

export const registerUser = async (userData: CreateUserDto) => {
  const { username, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role });
  await user.save();
  return user;
};

export const loginUser = async (loginData: LoginUserDto) => {
  const { email, password } = loginData;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  
  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  // Save the refreshToken in the database
  user.refreshToken = refreshToken;
  await user.save();
  
  // Return accessToken, refreshToken, and user (including role)
  return { accessToken, refreshToken, user: { username: user.username, email: user.email, role: user.role } };
};

export const refreshAccessToken = async (refreshData: RefreshTokenDto) => {
  const { refreshToken } = refreshData;
  
  // Verify the refresh token
  const payload: any = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  if (!payload || !payload.userId) {
    throw new Error('Invalid refresh token');
  }

  // Find the user by userId
  const user = await User.findById(payload.userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  // Generate a new access token
  return generateAccessToken(user._id.toString(), user.role);
};
