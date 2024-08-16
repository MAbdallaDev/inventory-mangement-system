import axios from 'axios';
const API_BASE_URL = 'https://api.yasmin1.com/api'
const apiService = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   }
})

// Intercept requests to include the token from localStorage
//* config: This is the Axios request configuration object.
apiService.interceptors.request.use(config => {
   const token = localStorage.getItem('token');
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
}, error => {
   return Promise.reject(error);
});

// Intercept responses to handle errors globally
/*
   *response: This is the response object from the server.
   *error.response.status === 401: Checks if the error status is 401.
   *Promise.reject(error): Ensures that the error is passed down the promise chain.
*/
apiService.interceptors.response.use(response => {
   return response;
}, error => {
   return Promise.reject(error);
});


// Color API
//* Status: Completed
export const getColors = (pageNumber) => apiService.get(`/color?page=${pageNumber}`)
export const getAllColors = () => apiService.get('/color/1')
export const addColor = (colorData) => apiService.post('/color', colorData)
export const updateColor = ({ id, name }) => apiService.put(
   `/color/${id}`,
   { name, _method: 'PUT' }
)
export const deleteColor = (colorId) => apiService.delete(`/color/${colorId}`)


// Size API
//* Status: Completed
export const getSizes = () => apiService.get('/size')
export const addSize = (sizeData) => apiService.post('/size', sizeData)
export const updateSize = ({ id, name }) => apiService.put(
   `/size/${id}`,
   { name, _method: 'PUT' }
)
export const deleteSize = (sizeId) => apiService.delete(`/size/${sizeId}`)


//Product API
//* Status: Completed
export const addProduct = (productData) => apiService.post('/product/store', productData)
export const getProducts = (pageNumber) => apiService.get(`/product/index?page=${pageNumber}`)
// export const getAllProducts = () => apiService.get('/product/index/1')
export const deleteProduct = (productId) => apiService.delete(`/product/destroy/${productId}`)
//get product by id
export const getProductById = (productId) => apiService.get(`/product/show/${productId}`)
// update product /product/update/2
export const updateProduct = ({ id, product }) => apiService.put(
   `/product/update/${id}`,
   { ...product, _method: 'PUT' }
)
// get the name of all products 
export const getNameOfAllProductsApi = () => apiService.get('/product/all');
// get (search for) product by its name
export const getProductByNameAPI = ({ name, status }) =>
   apiService.post('product/search', { name, status });
export const getColorsBySizeApi = (productName, sizeId) =>
   apiService.post('/product/get_color', { product_name: productName, size_id: sizeId });



// Authentication API
//* Status: Completed
export const loginApi = (credentials) => apiService.post('/login', credentials);
export const signupApi = (userData) => apiService.post('/register', userData);
export const forgetPasswordApi = (email) => apiService.post('/forgot-password', { email });
export const resetPasswordApi = (resetData) => apiService.post('/reset-password', resetData);


// Customer / Client API
//* Status: Completed
export const addCustomerApi = (customerData) => apiService.post('/client', customerData);
export const getCustomersApi = (pageNumber) => apiService.get(`/client?page=${pageNumber}`);
export const getAllCustomersApi = () => apiService.get(`/client/1`);
export const getCustomerByIdApi = (customerId) => apiService.get(`/show/client/${customerId}`)
export const updateCustomerApi = (customerData) => apiService.put(
   `/client/${customerData?.id}`,
   { ...customerData, _method: 'PUT' });
export const deleteCustomerApi = (customerId) => apiService.delete(`/client/${customerId}`);

// Invoices API
//* Status: Completed
// export const getInvoicesApi = (pageNumber) => apiService.get(`/invoice?page=${pageNumber}`)
export const getInvoicesApi = ({ page, date }) =>
   apiService.post(`/search_invoice_by_date?page=${page}`, { date })
export const getInvoicesByCustomerIdApi = (customerId) => apiService.get(`/client/invoice/${customerId}`)
export const getInvoiceByIdApi = (invoiceId) => apiService.get(`/invoice/${invoiceId}`)
export const addInvoiceApi = (invoiceData) => apiService.post('/invoice', invoiceData);
export const updateInvoiceApi = ({ id, invoice }) => apiService.put(`/invoice/${id}`, {
   ...invoice,
   _method: 'PUT'
})
export const deleteInvoiceApi = (invoiceId) => apiService.delete(`/invoice/${invoiceId}`);


// User API
//* Status: Completed
export const getUserApi = (pageNumber) => apiService.get(`/user?page=${pageNumber}`);
export const updateUserApi = (userData) => apiService.post(`/user/${userData?.id}`,
   { ...userData, _method: 'PUT' }
)
export const deleteUserApi = (userId) => apiService.delete(`/user/${userId}`)


// Statistics Api
//* Status: Completed
export const getStatistics = () => apiService.get('/statistics');