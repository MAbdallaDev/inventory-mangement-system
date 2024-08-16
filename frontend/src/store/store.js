import { configureStore } from '@reduxjs/toolkit';
import { sidebarSlice, colorSlice, sizeSlice, loadingSlice, productSlice, authSlice, CustomerSlice, userSlice, invoiceSlice } from './slices';
import loadingMiddleware from './slices/loadingMiddleware'
export const store = configureStore({
   reducer: {
      auth: authSlice,
      loading: loadingSlice,
      sidebar: sidebarSlice,
      colors: colorSlice,
      sizes: sizeSlice,
      products: productSlice,
      customers: CustomerSlice,
      user: userSlice,
      invoices:invoiceSlice,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingMiddleware),

})