import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUserDto, LoginUserDto } from './authTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    register: builder.mutation<{ accessToken: string; refreshToken: string; user: { username: string; email: string } }, CreateUserDto>({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation<{ accessToken: string; refreshToken: string; user: { username: string; email: string; role: string } }, LoginUserDto>({
      query: (loginData) => ({
        url: '/users/login',
        method: 'POST',
        body: loginData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;