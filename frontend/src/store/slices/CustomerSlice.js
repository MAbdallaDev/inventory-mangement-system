import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCustomerApi, deleteCustomerApi, getAllCustomersApi, getCustomerByIdApi, getCustomersApi, updateCustomerApi } from "../../services/apiService";
import { setFulfilledState, setPagination, setPendingState, setRejectionState } from "./sliceHelpers";
const initialState = {
   customers: [],
   error: null,
   status: 'idle',
   currentPage: 1,
   totalPages: 1,
   perPage: 0,
   totalCustomers: 0
}
export const addCustomer = createAsyncThunk('customer/addCustomer',
   async (customerData, { rejectWithValue }) => {
      try {
         const response = await addCustomerApi(customerData);
         return response.data;
      } catch (err) {
         return rejectWithValue(err?.response?.data || 'error in adding customer api');
      }
   }
)
export const getCustomers = createAsyncThunk('customer/getAllCustomers',
   async ({pageNumber}, { rejectWithValue }) => {
      try {
         const response = await getCustomersApi(pageNumber || 1);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in get all customers api')
      }
   }
)
export const getAllCustomers = createAsyncThunk('customer/getAllCustomers',
   async (_, { rejectWithValue }) => {
      try {
         const response = await getAllCustomersApi();
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in get all customers api')
      }
   }
)
export const deleteCustomer = createAsyncThunk('customer/deleteCustomer',
   async (customerId, { rejectWithValue }) => {
      try {
         const response = await deleteCustomerApi(customerId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in delete customer api')
      }
   }
)
export const getCustomerById = createAsyncThunk('customer/getCustomerById',
   async (customerId, { rejectWithValue }) => {
      try {
         const response = await getCustomerByIdApi(customerId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in get customer by id api')
      }
   }
)
export const updateCustomer = createAsyncThunk('customer/updateCustomer',
   async (customerData, { rejectWithValue }) => {
      try {
         const response = await updateCustomerApi(customerData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in update customer api')
      }
   }
)
const CustomerSlice = createSlice({
   name: "customer",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      //*Add Customer
      builder.addCase(addCustomer.pending, (state) => setPendingState(state));
      builder.addCase(addCustomer.fulfilled, (state, action) => {
         state.customers.push(action?.payload?.client)
      })
      builder.addCase(addCustomer.rejected, (state) => setRejectionState(state))

      //* Get All Customers
      builder.addCase(getCustomers.pending, (state) => setPendingState(state))
      builder.addCase(getCustomers.fulfilled, (state, action) => {
         setFulfilledState(state);
         setPagination(state, action);
         state.customers = action.payload?.clients;
         state.totalCustomers = action.payload?.meta?.total;
      })
      builder.addCase(getCustomers.rejected, (state) => setRejectionState(state))

      //* Get Customer Details By Id
      builder.addCase(getCustomerById.pending, (state) => setPendingState(state))
      builder.addCase(getCustomerById.fulfilled, (state) => setFulfilledState(state))
      builder.addCase(getCustomerById.rejected, (state => setRejectionState(state)))
      //* Update Customer
      builder.addCase(updateCustomer.pending, (state) => setPendingState(state))
      builder.addCase(updateCustomer.fulfilled, (state, action) => {
         setFulfilledState(state);
      })
      builder.addCase(updateCustomer.rejected, (state) => setRejectionState(state))

      //*Delete Customer
      builder.addCase(deleteCustomer.pending, (state) => setPendingState(state))
      builder.addCase(deleteCustomer.fulfilled, (state, action) => setFulfilledState(state, action))
      builder.addCase(deleteCustomer.rejected, (state) => setRejectionState(state))

   }
})

export default CustomerSlice.reducer;