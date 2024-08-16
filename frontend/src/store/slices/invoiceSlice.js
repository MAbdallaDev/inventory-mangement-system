import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addInvoiceApi, deleteInvoiceApi, getInvoiceByIdApi, getInvoicesApi, getInvoicesByCustomerIdApi, updateInvoiceApi } from "../../services/apiService";
import { setFulfilledState, setPagination, setPendingState, setRejectionState } from "./sliceHelpers";

const initialState = {
   invoices: [],
   currentPage: 1,
   totalPages: 1,
   totalInvoices: 0,
   perPage: 0,
   error: null,
   status: 'idle',
}

export const getInvoices = createAsyncThunk('invoice/getInvoices',
   async ({ pageNumber, date }, { rejectWithValue }) => {
      try {
         const page = pageNumber || 1;
         const response = await getInvoicesApi({ page, date });
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in add invoice function');
      }
   }
)
export const getInvoiceById = createAsyncThunk('invoice/getInvoiceById',
   async (invoiceId, { rejectWithValue }) => {
      try {
         const response = await getInvoiceByIdApi(invoiceId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in getInvoiceById function');
      }
   })
export const addInvoice = createAsyncThunk('invoice/addInvoice',
   async (invoiceData, { rejectWithValue }) => {
      try {
         const response = await addInvoiceApi(invoiceData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in add invoice function');
      }
   }
)
export const getInvoicesByCustomerId = createAsyncThunk('invoice/getInvoicesByCustomerId',
   async (customerId, { rejectWithValue }) => {
      try {
         const response = await getInvoicesByCustomerIdApi(customerId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in getInvoicesByCustomerId function');
      }
   }
)
export const updateInvoice = createAsyncThunk('invoice/updateInvoice',
   async ({ id, invoice }, { rejectWithValue }) => {
      try {
         const response = await updateInvoiceApi({ id, invoice });
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in updateInvoice function');
      }
   }
)

export const deleteInvoice = createAsyncThunk('invoice/deleteInvoice',
   async (invoiceId, { rejectWithValue }) => {
      try {
         const response = await deleteInvoiceApi(invoiceId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in delete Invoice function');
      }
   }
)
const invoiceSlice = createSlice({
   name: "invoice",
   initialState,
   reducers: {},
   extraReducers: (buiilder) => {
      //* Get invoices in pageNumber 
      buiilder.addCase(getInvoices.pending, (state) => setPendingState(state));
      buiilder.addCase(getInvoices.fulfilled, (state, action) => {
         setFulfilledState(state);
         setPagination(state, action);
         state.invoices = action.payload?.invoiceInfos;
         state.totalInvoices = action.payload?.meta?.total;
      });
      buiilder.addCase(getInvoices.rejected, (state) => setRejectionState(state));

      //* Add Invoice 
      buiilder.addCase(addInvoice.pending, (state) => setPendingState(state));
      buiilder.addCase(addInvoice.fulfilled, (state, action) => {
         setFulfilledState(state);
         state.invoices.push(action.payload);
      });
      buiilder.addCase(addInvoice.rejected, (state) => setRejectionState(state));

      //* Get Invoices For specific Customer 
      buiilder.addCase(getInvoicesByCustomerId.pending, (state) => setPendingState(state));
      buiilder.addCase(getInvoicesByCustomerId.fulfilled, (state) => setFulfilledState(state));
      buiilder.addCase(getInvoicesByCustomerId.rejected, (state) => setRejectionState(state));
      //* Get Invoices by id
      buiilder.addCase(getInvoiceById.pending, (state) => setPendingState(state));
      buiilder.addCase(getInvoiceById.fulfilled, (state) => setFulfilledState(state));
      buiilder.addCase(getInvoiceById.rejected, (state) => setRejectionState(state));

      //* Delete Invoice
      buiilder.addCase(deleteInvoice.pending, (state) => setPendingState(state));
      buiilder.addCase(deleteInvoice.fulfilled, (state) => setFulfilledState(state));
      buiilder.addCase(deleteInvoice.rejected, (state) => setRejectionState(state));
   }
})
export default invoiceSlice.reducer;