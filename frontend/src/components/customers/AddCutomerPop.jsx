import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BtnComp } from '../common';
import { useDispatch } from 'react-redux';
import { addCustomer, getCustomers, updateCustomer } from '../../store/slices/CustomerSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const AddCutomerPop = ({ show, isEditing, editedCustomerData, handleClose }) => {
   const dispatch = useDispatch();
   const [customerData, setCustomerData] = useState({
      name: '',
      phone: '',
      address: ''
   })
   const formGroupStyle = 'align-items-center d-flex gap-2';
   const handleCustomerAction = async (actionType, customerData) => {
      try {
         const response = await dispatch(actionType(customerData)).unwrap();
         MySwal.fire({
            icon: 'success',
            text: `${response?.message}`,
            showConfirmButton: false,
            timer: 1800
         });
         handleClose();
         setCustomerData({ name: '', phone: '', address: '' });
         dispatch(getCustomers({}));
      } catch (err) {
         MySwal.fire({
            icon: 'error',
            text: err.message || `حدث خطاء, حاول مرة اخرى`,
            showConfirmButton: true,
            confirmButtonText: 'OK'
         });
      }
   }
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (isEditing) {
         // Update existing customer
         handleCustomerAction(updateCustomer, customerData);
      } else {
         handleCustomerAction(addCustomer, customerData);
      }
   };

   useEffect(() => {
      if (isEditing) {
         setCustomerData(editedCustomerData);
      } else {
         setCustomerData({
            name: '',
            phone: '',
            address: ''
         })
      }
   }, [isEditing, editedCustomerData])
   return (
      <Modal show={show} onHide={handleClose} className='pop-modal cutomer-pop'>
         <Modal.Header closeButton className='d-flex justify-content-between'>
            <Modal.Title>{isEditing ? 'تعديل' : 'اضافة'} عميل</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
               <Form.Group controlId="customerName" className={formGroupStyle}>
                  <Form.Label className='mb-0'>الاسم:</Form.Label>
                  <Form.Control
                     type="text"
                     value={customerData.name}
                     onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                     required
                  />
               </Form.Group>
               <Form.Group controlId="customerPhone" className={formGroupStyle}>
                  <Form.Label className='mb-0'>رقم التليفون:</Form.Label>
                  <Form.Control
                     type="tel"
                     value={customerData.phone}
                     onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                     required
                  />
               </Form.Group>
               <Form.Group controlId="customerAddress" className={formGroupStyle}>
                  <Form.Label className='mb-0'>العنوان:</Form.Label>
                  <Form.Control
                     type="text"
                     value={customerData.address}
                     onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                     required
                  />
               </Form.Group>
               <Modal.Footer>
                  <BtnComp
                     name='إلغاء'
                     variant="secondary"
                     onclickFunc={handleClose}
                     titleAttr={isEditing ? 'إلغاء تعديل العميل' : 'الغاء اضافة العميل'}
                  />
                  <BtnComp
                     type='submit'
                     name='تاكيد'
                     variant="success"
                     // onclickFunc={handleAddColor}
                     titleAttr={isEditing ? 'تاكيد تعديل العميل' : 'تاكيد اضافة العميل'}
                  />
               </Modal.Footer>
            </Form>
         </Modal.Body>
      </Modal>
   )
}

export default AddCutomerPop