//Helper Functions
export const setPendingState = (state) => {
   state.status = 'pending'
}
export const setRejectionState = (state, action) => {
   state.status = 'rejected';
   state.error = action?.error?.message || 'Something went wrong'
   console.error('Error occurred:', action); // Log error for debugging
}
//normal Fulfilled State
export const setFulfilledState = (state) => {
   state.status = 'succeeded'
   state.error = null;
}

export const setPagination = (state, action) => {
   const meta = action.payload?.meta;
   if (meta) {
      const { current_page, total_pages, per_page } = meta;
      state.currentPage = current_page;
      state.perPage = per_page;
      state.totalPages = total_pages;
   } else {
      console.error('Pagination metadata is missing from the response');
   }
}

// Fulfilled State for auth slice only
export const setAuthFulfilledState = (state, action) => {
   state.status = 'succeeded'
   state.error = null
   state.user = action?.payload?.user;
   state.role = action?.payload?.user?.role || 'user';
   state.token = action?.payload?.token;
   localStorage.setItem('token', state.token); // Persist token
   localStorage.setItem('user', JSON.stringify(state.user));
}

export const setSizesMap = (state, action) => {
   const temp = action?.payload?.reduce((acc, size) => {
      acc[size?.name] = size?.id;
      return acc;
   }, {})
   state.sizesMap = temp;
}