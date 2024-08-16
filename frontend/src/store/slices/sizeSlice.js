import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSize, deleteSize, getSizes, updateSize } from "../../services/apiService";
import { setFulfilledState, setPendingState, setRejectionState, setSizesMap } from "./sliceHelpers";
const initialState = {
   sizes: [],
   sizesMap: [],
   error: null,
   status: 'idle'
}
export const fetchingSizes = createAsyncThunk('sizes/fetchingSizes', async (_, { rejectWithValue }) => {
   try {
      const response = await getSizes();
      return response.data;
   } catch (error) {
      return rejectWithValue(error?.response?.data || 'Something went wrong in fetching sizes');
   }
})
export const removeSize = createAsyncThunk('sizes/removeSize', async (sizeId, { rejectWithValue }) => {
   try {
      const response = await deleteSize(sizeId);
      ;
      return response.data;
   } catch (error) {
      return rejectWithValue(error?.response?.data || 'Something went wrong in remove sizes')
   }
})
export const addNewSize = createAsyncThunk('sizes/addNewSize', async (sizeData, { rejectWithValue }) => {
   try {
      const response = await addSize(sizeData);
      return response.data;
   } catch (error) {
      return rejectWithValue(error?.response?.data || 'Something went wrong in add new sizes')
   }
})
export const editSize = createAsyncThunk('sizes/editSize', async (sizeData, { rejectWithValue }) => {
   try {
      const response = await updateSize(sizeData);
      return response.data;
   } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data || 'Something went wrong in edit sizes')
   }
})
const sizeSlice = createSlice({
   name: 'sizes',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      //fetchingSizes
      builder.addCase(fetchingSizes.pending, (state) => setPendingState(state))
      builder.addCase(fetchingSizes.fulfilled, (state, action) => {
         setFulfilledState(state)
         setSizesMap(state, action);
         state.sizes = action.payload;
      })
      builder.addCase(fetchingSizes.rejected, (state, action) => setRejectionState(state, action))
      //addNewSize
      builder.addCase(addNewSize.pending, (state) => setPendingState(state))
      builder.addCase(addNewSize.fulfilled, (state, action) => {
         setFulfilledState(state)
         state.sizes.push(action.payload);
      })
      builder.addCase(addNewSize.rejected, (state, action) => setRejectionState(state, action))
      //editSize
      builder.addCase(editSize.pending, (state) => setPendingState(state))
      builder.addCase(editSize.fulfilled, (state) => setFulfilledState(state))
      builder.addCase(editSize.rejected, (state, action) => setRejectionState(state, action))
      //remove
      builder.addCase(removeSize.pending, (state) => setPendingState(state))
      builder.addCase(removeSize.fulfilled, (state) => setFulfilledState(state))
      builder.addCase(removeSize.rejected, (state, action) => setRejectionState(state, action))
   }
})
export default sizeSlice.reducer;