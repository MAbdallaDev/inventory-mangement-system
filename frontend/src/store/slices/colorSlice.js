import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addColor, deleteColor, getAllColors, getColors, updateColor } from '../../services/apiService'
import { setFulfilledState, setPagination, setPendingState, setRejectionState } from "./sliceHelpers";
const initialState = {
   colors: [],
   totalColors: 0,
   totalPages: 1,
   currentPage: 1,
   perPage: 0,
   status: 'idle',
   error: null,
}

export const fetchingColors = createAsyncThunk('color/fetchingColors',
   async ({pageNumber}, { rejectWithValue }) => {
      try {
         const response = await getColors(pageNumber || 1);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   }
);
export const fetchingAllColors = createAsyncThunk('color/fetchingAllColors',
   async (_, { rejectWithValue }) => {
      try {
         const response = await getAllColors();
         return response.data;
      } catch (err) {
         return rejectWithValue(err?.response?.message || err.message);
      }
   }
)
export const addNewColor = createAsyncThunk('color/addColor',
   async (colorData, { rejectWithValue }) => {
      try {
         const response = await addColor(colorData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message || 'Error adding color');
      }
   }
);
export const editColor = createAsyncThunk('color/editColor',
   async (colorData, { rejectWithValue }) => {
      try {
         const response = await updateColor(colorData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || error.message || 'Error editing color');
      }
   }
);
export const removeColor = createAsyncThunk('color/removeColor',
   async (colorId, { rejectWithValue }) => {
      try {
         const response = await deleteColor(colorId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message || 'Error removing color');
      }
   }
);



const colorSlice = createSlice({
   name: "color",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      // fetchingAllColors
      builder.addCase(fetchingAllColors.pending, (state) => setPendingState(state))
      builder.addCase(fetchingAllColors.fulfilled, (state, action) => {
         setFulfilledState(state)
         state.colors = action.payload;
         state.currentPage = 1;
         state.totalPages = 1;
      })
      builder.addCase(fetchingAllColors.rejected, (state, action) => setRejectionState(state, action))
      // fetchingColors
      builder.addCase(fetchingColors.pending, (state) => setPendingState(state))
      builder.addCase(fetchingColors.fulfilled, (state, action) => {
         setFulfilledState(state)
         setPagination(state, action);
         state.colors = action.payload?.colors;
         state.totalColors = action.payload?.meta?.total;
      })
      builder.addCase(fetchingColors.rejected, (state, action) => setRejectionState(state, action))
      //addNewColor
      builder.addCase(addNewColor.pending, (state) => setPendingState(state))
      builder.addCase(addNewColor.fulfilled, (state, action) => {
         setFulfilledState(state)
         state.colors.push(action.payload?.color);
      })
      builder.addCase(addNewColor.rejected, (state, action) => setRejectionState(state, action))
      //editColor
      builder.addCase(editColor.pending, (state) => setPendingState(state))
      builder.addCase(editColor.fulfilled, (state) => setFulfilledState(state))
      builder.addCase(editColor.rejected, (state, action) => setRejectionState(state, action))
      //removeColor
      builder.addCase(removeColor.pending, (state) => setPendingState(state))
      builder.addCase(removeColor.fulfilled, (state) => setFulfilledState(state))
      builder.addCase(removeColor.rejected, (state, action) => setRejectionState(state, action))
   }
})
export default colorSlice.reducer;