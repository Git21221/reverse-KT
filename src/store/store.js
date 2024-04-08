import authSlice from '@/features/auth/authSlice.js';
import jobSlice from '@/features/job/jobSlice';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = {
  auth: authSlice,
  job: jobSlice,
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;