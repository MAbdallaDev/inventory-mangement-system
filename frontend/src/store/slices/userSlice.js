import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserApi, getUserApi, updateUserApi } from "../../services/apiService";
import { setFulfilledState, setPagination, setPendingState, setRejectionState } from "./sliceHelpers";

const initialState = {
   users: [],
   currentPage: 1,
   totalPages: 1,
   totalUsers: 1,
   perPage: 0,
   roles: {
      user: "موظف",
      manger: "مدير"
   },
   error: null,
   status: 'idle'
}
// user:"موظف"
export const getUser = createAsyncThunk('user/getUser',
   async (pageNumber, { rejectWithValue }) => {
      try {
         const response = await getUserApi(pageNumber || 1);
         return response.data?.User;
      } catch (e) {
         return rejectWithValue(e?.response?.data)
      }
   }
)
export const updateUser = createAsyncThunk('user/updateUser',
   async (userData, { rejectWithValue }) => {
      try {
         const response = await updateUserApi(userData);
         return response.data;
      } catch (e) {
         return rejectWithValue(e?.response?.data)
      }
   }
)
export const deleteUser = createAsyncThunk('user/deleteUser',
   async (userId, { rejectWithValue }) => {
      try {
         const response = await deleteUserApi(userId);
         return response.data;
      } catch (e) {
         return rejectWithValue(e?.response?.data)
      }
   }
)
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getUser.pending, (state) => setPendingState(state));
      builder.addCase(getUser.fulfilled, (state, action) => {
         setFulfilledState(state, action);
         setPagination(state, action)
         state.users = action.payload?.users;
         state.totalUsers = action.payload?.meta?.total;
      });
      builder.addCase(getUser.rejected, (state) => setRejectionState(state));

      builder.addCase(updateUser.pending, (state) => setPendingState(state));
      builder.addCase(updateUser.fulfilled, (state, action) => {
         setFulfilledState(state, action);
      })
      builder.addCase(updateUser.rejected, (state) => setRejectionState(state));
      builder.addCase(deleteUser.pending, (state) => setPendingState(state));
      builder.addCase(deleteUser.fulfilled, (state, action) => { setFulfilledState(state, action); });
      builder.addCase(deleteUser.rejected, (state) => setRejectionState(state));


   }
})

export const selectRoles = (state) => state?.user?.roles;

export default userSlice.reducer;