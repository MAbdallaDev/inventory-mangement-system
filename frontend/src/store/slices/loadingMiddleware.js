import { setLoading } from "./loadingSlice";
import { logout } from './authSlice';

const loadingMiddleware = (store) => {
   let ongoingRequests = 0;

   return (next) => (action) => {
      // Check if the action has a meta property with skipLoading set to true
      if (action.meta && action.meta.skipLoading) {
         return next(action); // Skip loading logic for this action
      }

      if (action.type.endsWith('/pending')) {
         ongoingRequests++;
         if (ongoingRequests === 1) {
            store.dispatch(setLoading(true));
         }
      } else if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
         ongoingRequests--;
         if (ongoingRequests === 0) {
            store.dispatch(setLoading(false));
         }
      }
      // Handle unauthorized access (401/403)
      if (action.type.endsWith('/rejected') && action.payload?.status === 401) {
         alert('انت لست مسجل');
         window.location.href='/تسجيل-دخول'
         store.dispatch(logout());
      }
      return next(action);
   };
};

export default loadingMiddleware;
