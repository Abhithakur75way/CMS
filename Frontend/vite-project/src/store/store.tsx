import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authSlice';
import { authApi } from '../services/authApi';
import { formApi } from '../services/formApi';
import { staticContentApi } from '../services/staticContentApi';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    [authApi.reducerPath]: authApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    [staticContentApi.reducerPath]: staticContentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, formApi.middleware, staticContentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;