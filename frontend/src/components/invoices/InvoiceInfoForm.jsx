import React from 'react'
import { format } from 'date-fns';
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const InvoiceInfoForm = ({ invoiceInfo, setInvoiceInfo, disableEditing }) => {
   const sharedStyle = {
      flexStyle: 'd-md-flex align-items-md-center gap-md-1',
      formGroup: 'd-md-flex align-items-md-center gap-md-1  py-2 mb-md-1',
   }
   const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

   return (
      <section className='invoice-card invoice-info-form rounded-2'>
         <div className="head px-3 py-4 mb-1">
            <h4 className='mb-0'>تفاصيل الفاتورة</h4>
         </div>
         <Form className='p-3'>
            <Form.Group controlId="invoice-number"
               className={`${sharedStyle?.formGroup}`}
            >
               <Form.Label>كود الفاتورة</Form.Label>
               <Form.Control
                  type="text"
                  value={invoiceInfo?.invoiceId}
                  disabled
               />
            </Form.Group>
            <Form.Group controlId="invoice-date"
               className={`${sharedStyle?.formGroup}`}
            >
               <Form.Label>تاريخ الفاتورة</Form.Label>
               <DatePicker
                  selected={invoiceInfo?.invoiceDate}
                  onChange={(date) => setInvoiceInfo({ ...invoiceInfo, invoiceDate: formatDate(date) })}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  disabled
               />
            </Form.Group>
            <Form.Group controlId="due-date"
               className={`${sharedStyle?.formGroup}`}
            >
               <Form.Label>تاريخ الاستحقاق</Form.Label>
               <DatePicker
                  selected={invoiceInfo?.dueDate}
                  onChange={(date) => setInvoiceInfo({ ...invoiceInfo, dueDate: formatDate(date) })}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  minDate={invoiceInfo?.invoiceDate} // Prevent selecting due date before invoice date
                  disabled={disableEditing}
               />
            </Form.Group>
            <Form.Group controlId="payment-method"
               className={`${sharedStyle?.formGroup}`}
            >
               <Form.Label>طريقة الدفع</Form.Label>
               <Form.Control
                  as="select"
                  value={invoiceInfo?.paymentMethod}
                  onChange={(e) => setInvoiceInfo({ ...invoiceInfo, paymentMethod: e.target.value })}
                  disabled={disableEditing}
               >
                  <option value="">اختار طريقة الدفع</option>
                  <option key='Cash' value='Cash'>Cash</option>
               </Form.Control>
            </Form.Group>
         </Form>
      </section>
   )
}

export default InvoiceInfoForm 