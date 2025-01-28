import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateFormDto, UpdateFormDto } from './formTypes';

// Function to get the token (this is just an example, you may have your own method)
const getAuthToken = () => localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/forms', // Adjust the base URL as needed
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createForm: builder.mutation<void, CreateFormDto>({
      query: (formData) => ({
        url: '/forms',
        method: 'POST',
        body: formData,
      }),
    }),
    updateForm: builder.mutation<void, { id: string; formData: UpdateFormDto }>({
      query: ({ id, formData }) => ({
        url: `/forms/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    deleteForm: builder.mutation<void, string>({
      query: (id) => ({
        url: `/forms/${id}`,
        method: 'DELETE',
      }),
    }),
    getFormById: builder.query<any, string>({
      query: (id) => `/forms/${id}`,
    }),
  }),
});

export const {
  useCreateFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation,
  useGetFormByIdQuery,
} = formApi;