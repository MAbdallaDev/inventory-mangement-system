import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvoiceById, updateInvoice } from '../../store/slices/invoiceSlice';
import useInvoiceForm from '../../hooks/useInvoiceForm';
import InvoiceInfoForm from './InvoiceInfoForm';
import CustomerInfoForm from './CustomerInfoForm';
import { BtnComp } from '../common';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useDecumentTitle from '../../hooks/useDecumentTitle';
import OrderDetailsForm from './OrderDetailsForm';

const MySwal = withReactContent(Swal);

const EditInvoice = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [invoiceData, setInvoiceData] = useState();
   useDecumentTitle('مخزنك - تعديل الفاتورة');

   useEffect(() => {
      getInvoiceData(id)
   }, [])
   const getInvoiceData = async (id) => {
      try {
         const response = await dispatch(getInvoiceById(id)).unwrap();
         setInvoiceData(response);
      } catch (e) { console.log(e); }
   }
   const {
      customerInfo,
      invoiceInfo,
      orderDetails,
      setCustomerInfo,
      setInvoiceInfo,
      setOrderDetails,
      areAllFieldsFilled
   } = useInvoiceForm(invoiceData, true);
   const isAllFilled = areAllFieldsFilled();

   useEffect(() => {
      if (invoiceData) {
         setCustomerInfo(invoiceData?.client);
         setInvoiceInfo({
            invoiceId: invoiceData?.invoice_code,
            invoiceDate: invoiceData?.invoice_date,
            dueDate: invoiceData?.due_date,
            paymentMethod: invoiceData?.payment_method,
         });
         setOrderDetails({
            items: Array.isArray(invoiceData?.invoices) ? invoiceData.invoices : [],
            description: invoiceData?.description,
            discount: invoiceData?.discount,
            totalQuantity: invoiceData?.total_quantity,
            totalPrice: invoiceData?.total_price,
         });
      }
   }, [invoiceData]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const invoice = {
         customer_info: (customerInfo?.id ? { id: customerInfo?.id } : customerInfo),
         invoice_info: { ...invoiceInfo, id: invoiceData?.id, },
         order_details: orderDetails
      }
      try {
         const response = await dispatch(updateInvoice({ id: invoiceData?.id, invoice })).unwrap();
         MySwal.fire({
            icon: 'success',
            text: `${response?.message || 'تم تحديث الفاتورة'}`,
            showConfirmButton: false,
            timer: 1500
         })
         .then(() => navigate('/الفواتير'));
      } catch (err) {
         console.log(e);
         MySwal.fire({
            icon: 'error',
            text: 'حدث خطأ أثناء التعديل',
            confirmButtonColor: '#3085d6'
         });
      }
   }
   return (
      <section className='invoices edit-invoice-page create-invoice'>
         <Container>
            <Row className='row-gap-4'>
               <h2 className='pb-4'> تعديل في الفاتورة {invoiceData?.invoice_code} </h2>
               <Col md={6}>
                  <InvoiceInfoForm
                     invoiceInfo={invoiceInfo}
                     setInvoiceInfo={setInvoiceInfo}
                     disableEditing={true}
                  />
               </Col>
               <Col md={6}>
                  <CustomerInfoForm
                     customer={customerInfo}
                     setCustomer={setCustomerInfo}
                     disableEditing={true}
                  />
               </Col>
               <Col xs={12}>
                  <OrderDetailsForm
                     orderDetails={orderDetails}
                     setOrderDetails={setOrderDetails}
                     disableEditing={true}
                  />
               </Col>
               <BtnComp
                  type="submit"
                  variant="success"
                  classes='create-invoice-btn m-auto'
                  name='تاكيد الفاتورة'
                  titleAttr={'قم بالتاكيد لاضافة الفاتورة'}
                  disabled={!isAllFilled}
                  onclickFunc={handleSubmit}
               />
               {!isAllFilled &&
                  <small className="text-danger">برجاء ملئ جميع البيانات المطلوبة لتاكيد الفاتورة</small>}
            </Row>
         </Container>
      </section>
   )
}

export default EditInvoice