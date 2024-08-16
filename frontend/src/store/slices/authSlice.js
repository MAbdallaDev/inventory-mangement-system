
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgetPasswordApi, loginApi, resetPasswordApi, signupApi } from '../../services/apiService';
import { setAuthFulfilledState, setFulfilledState, setPendingState, setRejectionState } from './sliceHelpers';

// Retrieve token from localStorage
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
   user: user || null,
   role: user?.role || 'user',
   token: token || null,
   error: null,
   status: 'idle'
}

export const login = createAsyncThunk('auth/login',
   async (credentials, { rejectWithValue }) => {
      try {
         const response = await loginApi(credentials);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'something went wrong login slice');
      }
   })

export const signup = createAsyncThunk('auth/signup', async (userData,
   { rejectWithValue }) => {
   try {
      const response = await signupApi(userData);
      return response.data;
   } catch (error) {
      return rejectWithValue(error.response?.data || 'something went wrong signup slice');
   }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetData,
   { rejectWithValue }) => {
   try {
      const response = await resetPasswordApi(resetData);
      return response.data;
   } catch (e) {
      return rejectWithValue(e?.response?.data || 'something went wrong reset password slice')
   }
})
export const forgetPassword = createAsyncThunk('auth/forgetPassword', async (email,
   { rejectWithValue }) => {
   try {
      const response = await forgetPasswordApi(email);
      return response.data;
   } catch (e) {
      return rejectWithValue(e?.response?.data || 'something went wrong forgetPassword slice')
   }
})
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.user = null;
         state.role = null;
         state.token = null;
         localStorage.removeItem('token');
         localStorage.removeItem('user');
      }
   },
   extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => setPendingState(state));
      builder.addCase(login.fulfilled, (state, action) => setAuthFulfilledState(state, action));
      builder.addCase(login.rejected, (state, action) => setRejectionState(state, action));
      // signup
      builder.addCase(signup.pending, (state) => setPendingState(state));
      builder.addCase(signup.fulfilled, (state, action) => setAuthFulfilledState(state, action));
      builder.addCase(signup.rejected, (state, action) => setRejectionState(state, action));
      // forget password
      builder.addCase(forgetPassword.pending, (state) => setPendingState(state));
      builder.addCase(forgetPassword.fulfilled, (state) => setFulfilledState(state));
      builder.addCase(forgetPassword.rejected, (state, action) => setRejectionState(state, action));
      // reset password
      builder.addCase(resetPassword.pending, (state) => setPendingState(state));
      builder.addCase(resetPassword.fulfilled, (state) => setFulfilledState(state));
      builder.addCase(resetPassword.rejected, (state, action) => setRejectionState(state, action));
   }
})
export const selectUserRole = (state) => state?.auth?.role;
export default authSlice.reducer;
export const { logout } = authSlice.actions