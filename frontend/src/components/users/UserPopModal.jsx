import React from 'react'
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { BtnComp } from '../common';
import { getUser, selectRoles, updateUser } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { selectUserRole } from '../../store/slices/authSlice';
const MySwal = withReactContent(Swal);

const UserPopModal = ({ show, handleClose, userData, setUserData }) => {
   const formGroupStyle = 'align-items-center d-flex gap-2';
   const roles = useSelector(selectRoles);
   const currentUserRole = useSelector(selectUserRole);
   const dispatch = useDispatch();
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await dispatch(updateUser(userData)).unwrap();
         MySwal.fire({
            icon: 'success',
            text: `تم تعديل المستخدم`,
            showConfirmButton: false,
            timer: 1800
         });
         handleClose();
         dispatch(getUser());
      } catch (e) {
         MySwal.fire({
            icon: 'error',
            text: e.message || `حدث خطاء, حاول مرة اخرى`,
            showConfirmButton: true,
            confirmButtonText: 'OK'
         });
      }
   }
   return (
      <Modal show={show} onHide={handleClose} className='pop-modal user-pop'>
         <Modal.Header closeButton className='d-flex justify-content-between'>
            <Modal.Title>تعديل المستخدم</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form
               onSubmit={handleSubmit}
               className='d-flex flex-column gap-3'>
               <Form.Group controlId='userName' className={formGroupStyle}>
                  <Form.Label className='mb-0'>الاسم:</Form.Label>
                  <Form.Control
                     type='text'
                     value={userData.name}
                     onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                     required
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='userPhone' className={formGroupStyle}>
                  <Form.Label className='mb-0'>البريد الاكترونى:</Form.Label>
                  <Form.Control
                     type='email'
                     value={userData?.email}
                     onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                     required
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId='userRole' className={formGroupStyle}>
                  <Form.Label className='mb-0'>الوظيفة:</Form.Label>
                  <Form.Control
                     as='select'
                     value={userData?.role}
                     onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                     required
                     disabled={currentUserRole === 'user'}
                  >
                     <option key={userData?.role} value={userData?.role}>{roles[userData?.role]}</option>
                     {Object?.entries(roles)?.map(([role, name]) => (
                        role !== userData?.role && <option key={role} value={role}>{name}</option>
                     ))}
                  </Form.Control>
               </Form.Group>
               <Modal.Footer>
                  <BtnComp
                     name='الغاء'
                     variant='success'
                     titleAttr='الغاء تعديل المستخدم'
                     onclickFunc={handleClose}
                  />
                  <BtnComp
                     type='submit'
                     name='تاكيد'
                     variant="success"
                     titleAttr='تاكيد تعديل المستخدم'
                  />
               </Modal.Footer>
            </Form>
         </Modal.Body>
      </Modal>
   )
}

export default UserPopModal