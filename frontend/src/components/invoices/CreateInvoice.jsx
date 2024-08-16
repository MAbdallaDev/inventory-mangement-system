import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BtnComp, SectionHeader } from '../common'
import useInvoiceForm from '../../hooks/useInvoiceForm';
import InvoiceInfoForm from './InvoiceInfoForm';
import CustomerInfoForm from './CustomerInfoForm';
import OrderDetailsForm from './OrderDetailsForm';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { addInvoice } from '../../store/slices/invoiceSlice';
import useDecumentTitle from '../../hooks/useDecumentTitle';

const MySwal = withReactContent(Swal);

const CreateInvoice = () => {
   const dispatch = useDispatch()
   useDecumentTitle('مخزنك - انشاء فاتورة');
   const {
      customerInfo,
      invoiceInfo,
      orderDetails,
      setCustomerInfo,
      setInvoiceInfo,
      setOrderDetails,
      areAllFieldsFilled
   } = useInvoiceForm(null, false);
   const isAllFilled = areAllFieldsFilled();
   const handleSubmit = async () => {
      const invoiceDate = {
         customer_info: (customerInfo?.id ? { id: customerInfo?.id } : customerInfo),
         invoice_info: invoiceInfo,
         order_details: orderDetails
      }
      if (isAllFilled) {
         try {
            await dispatch(addInvoice(invoiceDate)).unwrap();
            MySwal.fire({
               icon: 'success',
               text: `تم اضافة الفاتورة بنجاح`,
               showConfirmButton: true, // Show the confirm button
               confirmButtonText: 'OK' // Customize the button text
            }).then((result) => {
               if (result.isConfirmed) { // Check if the button was clicked
                  window.location.reload(); // Reload the page after pressing OK
               }
            });
         } catch (err) {
            console.log(err);
            MySwal.fire({
               icon: 'error',
               text: `${err?.message || 'حدث خطأ أثناء الحذف'}`,
               confirmButtonColor: '#3085d6'
            });
         }
      }
   }

   return (
      <section className='invoices create-invoice mb-4'>
         <Container >
            <SectionHeader
               header='انشاء فاتورة'
               btn={{ path: '/الفواتير', name: 'عرض الفواتير', titleAttr: 'عرض جميع الفواتير' }}
            />
            <Row className='row-gap-4'>
               <Col md={6}>
                  <InvoiceInfoForm
                     invoiceInfo={invoiceInfo}
                     setInvoiceInfo={setInvoiceInfo}
                  />
               </Col>
               <Col md={6}>
                  <CustomerInfoForm
                     customer={customerInfo}
                     setCustomer={setCustomerInfo}
                  />
               </Col>
               <Col xs={12}>
                  <OrderDetailsForm
                     orderDetails={orderDetails}
                     setOrderDetails={setOrderDetails}
                     disableEditing={false}
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
export default CreateInvoice