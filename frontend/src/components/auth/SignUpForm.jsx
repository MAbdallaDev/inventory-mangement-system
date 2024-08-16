import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import BtnComp from '../common/atoms/BtnComp';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/slices/authSlice';
import Swal from 'sweetalert2';
import EmailInputField from './EmailInputField';
import PasswordInputField from './PasswordInputField';
import './auth.scss'
import useDecumentTitle from '../../hooks/useDecumentTitle';


const SignUpForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [passwordIsNotConfirmed, setPasswordIsNotConfirmed] = useState(false);
   const isLoading = useSelector(state => state?.loading?.isLoading)
   useDecumentTitle('مخزنك - التسجيل ');

   useEffect(() => {
      setPasswordIsNotConfirmed(confirmPassword !== '' && password !== confirmPassword)
   }, [password, confirmPassword])
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (passwordIsNotConfirmed) {
         Swal.fire({
            icon: 'error',
            text: 'كلمة المرور غير متطابقة',
            confirmButtonText: 'OK',
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            }
         });
         return;
      }
      const useData = {
         name: username,
         email,
         password,
         password_confirmation: confirmPassword,
      }
      try {
         await dispatch(signup(useData)).unwrap();
         Swal.fire({
            icon: 'success',
            title: 'تم التسجيل بنجاح',
            timer: 2000, // Auto-close after 2 seconds
            showConfirmButton: false,
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            }
         }).then(() => {
            navigate('/'); // Redirect to the homepage
         });
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'فشل التسجيل',
            text: `${error?.message || 'حدث مشكله اثناء التسجيل حاول مرة اخرى'}`,
            confirmButtonText: 'OK',
            customClass: {
               popup: 'popup-in-unautherised',      // Adds a class to the popup (second div)
            }
         });
      }
   }
   return (
      <section className='regstration d-flex justify-content-center '>
         <Form onSubmit={handleSubmit}>
            <h3 className='mb-4'>قم بإنشاء حساب</h3>
            <Form.Group className="mb-3" controlId="username">
               <Form.Label>اسم المستخدم  </Form.Label>
               <Form.Control
                  type="text"
                  className='rounded-5'
                  title="ادخل اسم المستخدم"
                  minLength={4}
                  autoFocus
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </Form.Group>
            <EmailInputField email={email} setEmail={setEmail} />
            <PasswordInputField password={password} setPassword={setPassword} />
            <Form.Group className="mb-3 position-relative" controlId="confirmPassword">
               <Form.Label>تاكيد كلمة المرور </Form.Label>
               <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  className='rounded-5'
                  title="تاكيد كلمة المرور"
                  value={confirmPassword}
                  minLength={8}
                  onChange={(e) => {
                     setConfirmPassword(e.target.value)
                  }}
                  required
               />
               <span className='show-password'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
               >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
               </span>
               {passwordIsNotConfirmed &&
                  <Form.Text className="text-danger">
                     كلمة المرور غير متطابقة
                  </Form.Text>
               }
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center mt-3">
               <BtnComp
                  type="submit"
                  variant="primary"
                  name='التسجيل'
                  titleAttr='سجل دخول الى حسابك'
                  disabled={isLoading}
               />
               <Link to='/تسجيل-دخول' className=''>لديك حساب بالفعل</Link>
            </div>
         </Form>
      </section>
   )
}

export default SignUpForm