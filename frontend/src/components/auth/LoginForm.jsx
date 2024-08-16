import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import BtnComp from '../common/atoms/BtnComp';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import Swal from 'sweetalert2';
import EmailInputField from './EmailInputField';
import PasswordInputField from './PasswordInputField';
import './auth.scss'
import useDecumentTitle from '../../hooks/useDecumentTitle';

const LoginForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isLoading = useSelector(state => state?.loading?.isLoading)
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   useDecumentTitle('مخزنك - التسجيل الدخول');

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await dispatch(login({ email, password })).unwrap();
         Swal.fire({
            icon: 'success',
            text: 'تم التسجيل بنجاح',
            timer: 2000, // Auto-close after 2 seconds
            showConfirmButton: false,
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            }
         }).then(() => {
            navigate('/'); // Redirect to the homepage
         });
      } catch (err) {
         console.log(err);
         Swal.fire({
            icon: 'error',
            text: `${err?.message || 'حدث مشكله اثناء التسجيل حاول مرة اخرى'}`,
            confirmButtonText: 'OK',
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            } // Show OK button
         });
      }
   }
   return (
      <section className='regstration d-flex justify-content-center mt-5'>
         <Form
            onSubmit={handleSubmit}
         >
            <h3 className='mb-4'>سجل دخول الى حسابك</h3>
            <EmailInputField email={email} setEmail={setEmail} />
            <PasswordInputField password={password} setPassword={setPassword} />
            <div className="d-flex justify-content-between align-items-center mb-4">
               <BtnComp
                  type="submit"
                  variant="primary"
                  name='تسجيل الدخول'
                  titleAttr='سجل دخول الى حسابك'
                  disabled={isLoading}
               />
               <Link to='/نسيت-كلمة-السر' className='forget-password text-dark'>نسيت كلمة السر؟</Link>
            </div>
            <Link to='/التسجيل' className='d-inline-block text-center w-100'> انشاء حساب جديد</Link>
         </Form>
      </section>
   )
}

export default LoginForm