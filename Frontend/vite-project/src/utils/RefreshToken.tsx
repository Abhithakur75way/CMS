import { useRefreshTokenMutation } from '../services/authApi';

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token found');

  const [refresh] = useRefreshTokenMutation();
  const response = await refresh({ refreshToken }).unwrap();
  localStorage.setItem('accessToken', response.accessToken);
  return response.accessToken;
};