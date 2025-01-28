import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get the token from localStorage
const getAuthToken = () => localStorage.getItem('token');

export const staticContentApi = createApi({
  reducerPath: 'staticContentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/static-content', 
    prepareHeaders: (headers) => {
      const token = getAuthToken(); // Get token from localStorage
      if (token) {
        // Add token to Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['StaticContent'],
  endpoints: (builder) => ({
    createStaticContent: builder.mutation({
      query: (data) => ({
        url: 'static-content',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'StaticContent', id: 'LIST' }],
    }),
    getStaticContent: builder.query({
      query: (id) => `static-content/${id}`,
      providesTags: (result, error, id) => [{ type: 'StaticContent', id }],
    }),
    updateStaticContent: builder.mutation({
      query: ({ id, data }) => ({
        url: `static-content/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'StaticContent', id: 'LIST' }],
    }),
  }),
});

export const { useCreateStaticContentMutation, useGetStaticContentQuery, useUpdateStaticContentMutation } = staticContentApi;
