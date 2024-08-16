import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { BtnComp } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import EmailInputField from './EmailInputField';
import { forgetPassword } from '../../store/slices/authSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useDecumentTitle from '../../hooks/useDecumentTitle';

const ForgetPassword = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isLoading = useSelector(state => state?.loading?.isLoading)
   const [email, setEmail] = useState('');
   useDecumentTitle('مخزنك - نسيت كلمة المرور');

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await dispatch(forgetPassword(email)).unwrap();
         Swal.fire({
            icon: 'success',
            text: 'تم ارسال كود التاكيد الى بريدك الالكتروني',
            showConfirmButton: true,
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            }
         }).then(() => {
            navigate('/تعديل-كلمة-السرت'); // Redirect to the reset password page
         });
      } catch (error) {
         Swal.fire({
            icon: 'error',
            text: error.message || 'حدث مشكله اثناء ارسال كود التاكيد حاول مرة اخري',
            confirmButtonText: 'OK',
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            }
         });
      }
   }
   return (
      <section className='regstration forget-password d-flex justify-content-center mt-5'>
         <Form
            onSubmit={handleSubmit}
         >
            <h6 className='mb-4'>قم باضافة البريد الإلكتروني لارسال كود التاكيد</h6>
            <EmailInputField email={email} setEmail={setEmail} />
            <BtnComp
               type="submit"
               variant="primary"
               name='تاكيد'
               titleAttr='تاكيد لارسال الكود'
               disabled={isLoading}
            />
         </Form>
      </section>
   )
}

export default ForgetPassword