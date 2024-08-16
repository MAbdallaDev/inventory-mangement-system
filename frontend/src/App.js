
import { Route, Routes } from 'react-router-dom';
import { Footer, Header, Loader, Sidebar } from './components/common';
import { LoginForm, SignUpForm, ForgetPassword, ResetPassword } from './components/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct, AllProducts, EditProduct, ProductInfo } from './components/warehouse';
import useMobileMedia from './hooks/useMobileMedia';
import { useEffect } from 'react';
import { setLoading } from './store/slices/loadingSlice';
import { ColorSetting, SizeSetting } from './components/settings';
import Home from './components/home/Home';
import PrivateRoute from './components/PrivateRoute';
import { AllInvoices, CreateInvoice, EditInvoice, InvoiceDetails } from './components/invoices';
import { CustomerDetails, Customers } from './components/customers';
import { Users } from './components/users';
import './App.scss';

function App() {
  const sidebarCollapse = useSelector((state) => state?.sidebar.collapsed);
  const isLoading = useSelector(state => state?.loading?.isLoading);
  const isMobile = useMobileMedia();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state?.auth?.token);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, [dispatch]);
  return (
    <div className="App">
      {isLoading && <Loader />}
      <Header />
      {isAuthenticated && <Sidebar />}
      <main
        className='py-3 py-md-4 my-md-1'
        style={{ marginRight: !isAuthenticated ? '0px' : (sidebarCollapse || isMobile) ? '90px' : '300px' }}
      >
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/اضافة-منتج' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path='/تعديل-منتج/:id' element={<PrivateRoute><EditProduct /></PrivateRoute>} />
          <Route path='/منتجات' element={<PrivateRoute><AllProducts /></PrivateRoute>} />
          <Route path='/منتج/:id' element={<PrivateRoute><ProductInfo /></PrivateRoute>} />
          <Route path="/الاعدادات/اضافة-لون" element={<PrivateRoute><ColorSetting /></PrivateRoute>} />
          <Route path="/الاعدادات/اضافة-مقاس" element={<PrivateRoute><SizeSetting /></PrivateRoute>} />
          <Route path="/انشاء-فاتورة" element={<PrivateRoute> <CreateInvoice /></PrivateRoute>} />
          <Route path='/الفواتير' element={<PrivateRoute><AllInvoices /></PrivateRoute>} />
          <Route path='/تعديل-فاتورة/:id' element={<PrivateRoute><EditInvoice /></PrivateRoute>} />
          <Route path='/فاتورة/:id' element={<PrivateRoute><InvoiceDetails /></PrivateRoute>} />
          <Route path='/العملاء' element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path='/عميل/:id' element={<PrivateRoute><CustomerDetails /></PrivateRoute>} />
          <Route path='/المستخدمين' element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path='/التسجيل' element={<SignUpForm />} />
          <Route path='/تسجيل-دخول' element={<LoginForm />} />
          <Route path='/نسيت-كلمة-السر' element={<ForgetPassword />} />
          <Route path='/تعديل-كلمة-السرت' element={<ResetPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
