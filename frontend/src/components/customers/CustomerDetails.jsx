import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BtnComp } from '../common'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCustomerById } from '../../store/slices/CustomerSlice'
import AddCutomerPop from './AddCutomerPop'
import { getInvoicesByCustomerId } from '../../store/slices/invoiceSlice'
import { InvoicesTable } from '../invoices'
import useDecumentTitle from '../../hooks/useDecumentTitle'
import './customers.scss'

const tableHeadCols = [
   { key: '#' },
   { key: 'الكود' },
   { key: 'التاريخ' },
   { key: 'طريقة الدفع' },
   { key: 'إجمالي السعر' },
   { key: 'العمليات' }
];

const CustomerDetails = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const [customer, setCustomer] = useState({})
   const [invoices, setInvoices] = useState([])
   const [show, setShow] = useState(false);
   useDecumentTitle('مخزنك - تفاصيل العميل');

   useEffect(() => {
      getCustomerDetaila();
      getAllInvoices(id);
   }, [id])
   const getCustomerDetaila = async () => {
      try {
         const response = await dispatch(getCustomerById(id)).unwrap();
         setCustomer(response)
      } catch (error) { console.log(error); }
   }
   const getAllInvoices = async (customerId) => {
      try {
         const response = await dispatch(getInvoicesByCustomerId(customerId)).unwrap();
         setInvoices(response)
      } catch (error) { console.log(error); }
   }

   return (
      <section className='customer-info-page'>
         <Container>
            <Row className='mb-3'>
               <Col xs={12} md={9} className='mb-3 mb-md-0'>
                  <h3 className='pb-1'>{`عرض بيانات عن العميل ${customer?.name}`} </h3>
               </Col>
               <Col xs={12} md={3} className='text-md-center'>
                  <BtnComp
                     variant='success'
                     name='تعديل العميل'
                     titleAttr='تعديل هذا العميل'
                     onclickFunc={() => setShow(true)} />
               </Col>
            </Row>
            <Row>
               <Col md={8} className='mb-3'>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>الاسم :</h5>
                     <p className='mb-0'>{customer?.name || 'غير معروف'}</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>العنوان :</h5>
                     <p className='mb-0'>{customer?.address || 'غير معروف'}</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>رقم التليفون :</h5>
                     <p className='mb-0'>{customer?.phone || 'غير معروف'}</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>تاريخ الاضافة :</h5>
                     <p className='mb-0'>{customer?.created_at || 'غير معروف'}</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>تاريخ اخر تعديل :</h5>
                     <p className='mb-0'>{customer?.updated_at || 'غير معروف'}</p>
                  </div>
               </Col>
               {
                  invoices.length > 0 ?
                  <Col lg={10}>
                     <h5 className='mb-3'>جميع الفواتير الخاصة {customer?.name}</h5>
                     <InvoicesTable
                        tableHeadCols={tableHeadCols}
                        invoices={invoices}
                        parentComp='customer'
                     />
                  </Col>
                  : <h6>لم يقم {customer?.name} بعمل فواتير حتى اللان</h6>
               }
            </Row>
            <Row>
               <AddCutomerPop
                  show={show}
                  isEditing={true}
                  editedCustomerData={customer}
                  handleClose={() => {
                     setShow(false);
                     getCustomerDetaila();
                  }}
               />
            </Row>
         </Container>
      </section>
   )
}

export default CustomerDetails