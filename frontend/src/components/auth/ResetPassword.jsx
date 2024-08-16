import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { BtnComp } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import EmailInputField from './EmailInputField';
import PasswordInputField from './PasswordInputField';
import { resetPassword } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useDecumentTitle from '../../hooks/useDecumentTitle';

const ResetPassword = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isLoading = useSelector(state => state?.loading?.isLoading)
   const [email, setEmail] = useState('');
   const [code, setCode] = useState('');
   const [password, setPassword] = useState('');
   useDecumentTitle('مخزنك - تعديل كلمة المرور');

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await dispatch(resetPassword({ email, password, otp:code })).unwrap();
         Swal.fire({
            icon: 'success',
            title: 'تم تغير كلمة المرور بنجاح',
            showConfirmButton: true,
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            }
         }).then(() => {
            navigate('/'); // Redirect to the reset password page
         });
      } catch (e) {
         Swal.fire({
            icon: 'error',
            text: e?.message || 'حدث مشكله حاول مرة اخري',
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
            <h6 className='mb-4'>قم باضافة كلمة المرور الجديدة</h6>
            <EmailInputField email={email} setEmail={setEmail} />
            <PasswordInputField password={password} setPassword={setPassword} />
            <Form.Group className="mb-3" controlId="code">
               <Form.Label>كود التاكيد </Form.Label>
               <Form.Control
                  type="text"
                  className='rounded-5'
                  title="ادخل كود التاكيد الذى تم ارساله مسبقا"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
               />
            </Form.Group>
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

export default ResetPassword