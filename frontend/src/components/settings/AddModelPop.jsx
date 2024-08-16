import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BtnComp } from '../common';
import './Settings.scss'
const MySwal = withReactContent(Swal);
//* popType = اضافة|| تعديل
const AddModel = ({
   popType,
   modelType,
   show,
   handleClose,
   itemData,
   popAddFunc,
   popEditFunc,
   popFetchFunc }) => {
   const dispatch = useDispatch();
   const [itemName, setItemName] = useState('');
   const handleAddColor = () => {
      if ((modelType?.en === 'color' && itemName?.length > 2) || (modelType?.en === 'size' && itemName?.length > 0)) {
         dispatch(
            (popType === 'اضافة')
               ? popAddFunc({ name: itemName })
               : popEditFunc({ id: itemData?.id, name: itemName })
         ).then((res) => {
            if (res.type.includes('rejected')) {
               // Handle API response errors explicitly
               const errorMessage = res.payload?.message || 'An error occurred';
               throw new Error(errorMessage);
            }
            handleClose(); // Close the modal after adding color
            dispatch(popFetchFunc({}));
            MySwal.fire({
               icon: 'success',
               text: `${res?.payload?.message}`,
               showConfirmButton: false,
               timer: 1500
            });
         }).catch((error) => {
            const errorMessage = error?.message || 'يرجى المحاولة مرة أخرى';
            MySwal.fire({
               icon: 'error',
               text: `${errorMessage}`,
               confirmButtonColor: '#3085d6',
            });
         });
      }
      else {
         MySwal.fire({
            icon: 'error',
            text: `الاسم اقصر من اللازم`,
            confirmButtonColor: '#3085d6',
         });
      }
   };
   useEffect(() => {
      setItemName(popType === 'تعديل' ? itemData?.name : '');
   }, [itemData, popType])
   return (
      <Modal show={show} onHide={handleClose} className='pop-modal'>
         <Modal.Header closeButton className='d-flex justify-content-between'>
            <Modal.Title>{popType} ال{modelType?.ar}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form.Group className='align-items-center d-flex gap-2'>
               <Form.Label className='mb-0'>اسم ال{modelType?.ar}:</Form.Label>
               <Form.Control
                  type="text"
                  required
                  autoFocus
                  minLength={2}
                  defaultValue={(popType === 'تعديل') ? itemData?.name : ''}
                  onChange={(e) => { setItemName(e.target.value) }}
               />
            </Form.Group>
         </Modal.Body>
         <Modal.Footer>
            <BtnComp 
            name='إلغاء' 
            variant="secondary" 
            onclickFunc={handleClose}
            titleAttr={` ${popType} الغاء`}
            />
            <BtnComp 
            name='تاكيد' 
            variant="success" 
            onclickFunc={handleAddColor}
            titleAttr={` ${popType} تاكيد`}
            />
         </Modal.Footer>
      </Modal>
   );
};

export default AddModel;
