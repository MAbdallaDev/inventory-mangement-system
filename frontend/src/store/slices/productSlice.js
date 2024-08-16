import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getColorsBySizeApi, getNameOfAllProductsApi, getProductByNameAPI, getProducts, updateProduct } from "../../services/apiService";
import { setFulfilledState, setPagination, setPendingState, setRejectionState } from "./sliceHelpers";

const initialState = {
   products: [],
   totalProducts: 0,
   totalPages: 1,
   currentPage: 1,
   perPage: 0,
   error: null,
   status: 'idle'
}

export const addNewProduct = createAsyncThunk('products/addNewProduct',
   async (productData, { rejectWithValue }) => {
      try {
         const response = await addProduct(productData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'something went wrong in add product function');
      }
   }
)
export const fetchingProducts = createAsyncThunk('products/fetchingProducts',
   async ({pageNumber}, { rejectWithValue }) => {
      try {
         const response = await getProducts(pageNumber || 1);
         return response.data;
      } catch (err) {
         return rejectWithValue(err.response?.data || 'something went wrong in fetching products function');
      }
   }
)

export const getNameOfAllProducts = createAsyncThunk('products/getNameOfAllProducts', async (_, { rejectWithValue }) => {
   try {
      const response = await getNameOfAllProductsApi();
      return response.data;
   } catch (error) {
      return rejectWithValue(error?.response?.data || 'error in getNameOfAllProducts function');
   }
});


export const getProductByName = createAsyncThunk(
   'products/getProductByName',
   async ({ name, status }, { rejectWithValue }) => {
      try {
         const response = await getProductByNameAPI({ name, status });
         return (status == 1) ? response.data : response.data?.products;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in getProductByName function');
      }
   },
   {
      condition: (_, { getState }) => {
         return true; // Allow the action to be dispatched
      },
      meta: { skipLoading: true } // Add this to skip loading
   }
);

export const getColorsBySize = createAsyncThunk(
   'products/getColorsBySize',
   async ({ productName, sizeId }, { rejectWithValue }) => {
      try {
         const response = await getColorsBySizeApi(productName, sizeId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error?.response?.data || 'error in getColorsBySize function');
      }
   },
   {
      condition: (_, { getState }) => {
         return true; // Allow the action to be dispatched
      },
      meta: { skipLoading: true } // Add this to skip loading
   }
);



export const removeProduct = createAsyncThunk('products/removeProduct',
   async (productId, { rejectWithValue }) => {
      try {
         const response = await deleteProduct(productId);
         return response.data;
      } catch (err) {
         return rejectWithValue(err.response?.data || 'something went wrong in delete products function');
      }
   }
)

export const editProduct = createAsyncThunk('products/editProduct', async ({ id, product },
   { rejectWithValue }) => {
   try {
      const response = await updateProduct({ id, product });
      return response.data;
   } catch (error) {
      return rejectWithValue(error?.response?.data || 'something went wrong in update products function');
   }
})

const productSlice = createSlice({
   name: "products",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      //* Add New Product
      builder.addCase(addNewProduct.pending, (state) => setPendingState(state))
      builder.addCase(addNewProduct.fulfilled, (state, action) => {
         setFulfilledState(state);
         state.products.push(action.payload);
      })
      builder.addCase(addNewProduct.rejected, (state, action) => setRejectionState(state, action))
      //* Get All Products
      builder.addCase(fetchingProducts.pending, (state) => setPendingState(state))
      builder.addCase(fetchingProducts.fulfilled, (state, action) => {
         setFulfilledState(state);
         setPagination(state, action);
         state.products = action.payload?.products;
         state.totalProducts = action.payload?.meta?.total;
      })
      builder.addCase(fetchingProducts.rejected, (state, action) => setRejectionState(state, action))
      //* Remove Product 
      builder.addCase(removeProduct.pending, (state) => setPendingState(state))
      builder.addCase(removeProduct.fulfilled, (state) => setFulfilledState(state))
      builder.addCase(removeProduct.rejected, (state, action) => setRejectionState(state, action))
      //* edit Product
      builder.addCase(editProduct.pending, (state) => setPendingState(state))
      builder.addCase(editProduct.fulfilled, (state, action) => {
         setFulfilledState(state);
         // state.products.push(action.payload);
      })
      builder.addCase(editProduct.rejected, (state, action) => setRejectionState(state, action))
   }
})

export default productSlice.reducer;