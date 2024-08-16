import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   collapsed: false,
};
const sidebarSlice = createSlice({
   name: 'sidebar',
   initialState,
   reducers: {
      toggleSidebar: (state) => {
         state.collapsed = !state.collapsed;
      },
      setSidebarCollapsed: (state, action) => {
         state.collapsed = action.payload;  // Explicitly set collapsed to true or false
      },
   }
})
export const { toggleSidebar, setSidebarCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;
