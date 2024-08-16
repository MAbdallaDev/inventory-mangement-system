import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInvoiceById } from '../../store/slices/invoiceSlice';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkComp } from '../common';
import InvoiceInfoForm from './InvoiceInfoForm';
import CustomerInfoForm from './CustomerInfoForm';
import OrderDetailsCard from './OrderDetailsCard';
import './Invoices.scss'
import useDecumentTitle from '../../hooks/useDecumentTitle';
const InvoiceDetails = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const [invoice, setInvoice] = useState();
   useDecumentTitle('مخزنك - تفاصيل عن الفاتورة');

   useEffect(() => {
      getInvoiceData(id)
   }, [])
   const getInvoiceData = async (id) => {
      try {
         const response = await dispatch(getInvoiceById(id)).unwrap();
         setInvoice(response);
      } catch (e) { console.log(e); }
   }

   return (
      <section className='invoices invoice-details-page'>
         <Container>
            <Row className='mb-3'>
               <Col xs={12} sm={8} md={9} className='mb-3 mb-md-0'>
                  <h3 className='pb-1'>{`عرض بيانات الفاتورة`} </h3>
               </Col>
               <Col xs={12} sm={4} md={3} className='text-md-center'>
                  <LinkComp path={`/تعديل-فاتورة/${invoice?.id}`} vairaint='success' name='تعديل الفاتورة' titleAttr='تعديل في هذا الفاتورة' />
               </Col>
            </Row>
            <Row className='row-gap-4'>
               <Col md={6}>
                  <InvoiceInfoForm
                     invoiceInfo={{
                        invoiceId: invoice?.invoice_code,
                        invoiceDate: invoice?.invoice_date,
                        dueDate: invoice?.due_date,
                        paymentMethod: invoice?.payment_method,
                     }}
                     disableEditing={true}
                  />
               </Col>
               <Col md={6}>
                  <CustomerInfoForm
                     customer={invoice?.client}
                     disableEditing={true}
                  />
               </Col>
               <Col>
                  <OrderDetailsCard
                     order={{
                        items: invoice?.invoices,
                        description: invoice?.description,
                        discount: invoice?.discount,
                        totalPrice: invoice?.total_price,
                        totalQuantity: invoice?.total_quantity,
                     }}
                  />
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default InvoiceDetails