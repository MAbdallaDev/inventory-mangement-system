import React, { useEffect, useState } from 'react'
import { SectionHeader } from '../common'
import { Col, Container, Form, Row } from 'react-bootstrap'
import InvoicesTable from './InvoicesTable';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoices } from '../../store/slices/invoiceSlice';
import PaginationComp from '../common/atoms/PaginationComp';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { FaMagnifyingGlass } from "react-icons/fa6";
import useDecumentTitle from '../../hooks/useDecumentTitle';
import './Invoices.scss'

const tableHeadCols = [
   { key: '#' },
   { key: 'الكود' },
   { key: 'اسم العميل' },
   { key: 'التاريخ' },
   { key: 'طريقة الدفع' },
   { key: 'إجمالي السعر' },
   { key: 'العمليات' }
];
const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd');
const nowDateFormat = formatDate(new Date());
const AllInvoices = () => {
   const dispatch = useDispatch();
   const { invoices, currentPage, totalPages, perPage } = useSelector(state => state?.invoices)
   const [selectedDate, setSelectedDate] = useState(null);
   useDecumentTitle('مخزنك - جميع الفواتير');

   useEffect(() => {
      dispatch(getInvoices({}))
   }, [dispatch])
   const resetDate = () => {
      setSelectedDate(null)
      dispatch(getInvoices({}))
   }
   const handleSubmitDate = async (e) => {
      e.preventDefault();
      dispatch(getInvoices({ pageNumber: 1, date: selectedDate }))
   }

   return (
      <section className='invoices all-invoices-page'>
         <Container>
            <SectionHeader
               header='جميع الفواتير '
               para='جميع الفواتير المتاحة فى المخزن حاليا'
               btn={{ path: "/انشاء-فاتورة", name: 'اضافة فاتورة', titleAttr: 'اضافة فاتورة جديدة' }} />
            <Row className='mt-5'>
               <Col>
                  <div
                     className="align-items-sm-center d-flex flex-column filter flex-sm-row-reverse gap-2 gap-sm-4 justify-content-between px-2 px-sm-4 py-3 rounded-top-3"
                  >
                     <Form
                        className={`position-relative`}
                        onSubmit={handleSubmitDate}
                     >
                        <Form.Group
                           controlId="invoice-date"
                        >
                           <DatePicker
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(formatDate(date))}
                              dateFormat="yyyy-MM-dd"
                              className="form-control me-1 date-picker "
                              title='ابحث بتاريخ اضافة الفاتورة'
                           />
                        </Form.Group>
                        <button
                           type='submit'
                           className='search-btn'
                        ><FaMagnifyingGlass /></button>
                     </Form>
                     <span
                        className='reset-btn fw-medium text-primary'
                        onClick={() => resetDate()}
                     >عرض كل الفواتير</span>
                  </div>
               </Col>
               {invoices?.length > 0
                  ?
                  <>
                     <InvoicesTable
                        tableHeadCols={tableHeadCols}
                        invoices={invoices}
                        parentComp={'invoices'}
                        paginate={{ currentPage, perPage }}
                     />
                     <div className="py-1"></div>
                     <PaginationComp
                        totalPages={totalPages}
                        currentPage={currentPage}
                        fetchingData={getInvoices}
                        invoiceDate={selectedDate}
                     />
                  </>
                  :
                  <h6 className='pe-4 my-3'>لا يود فواتير لهذا اليوم {selectedDate}</h6>
               }
            </Row>
         </Container>
      </section>
   )
}

export default AllInvoices