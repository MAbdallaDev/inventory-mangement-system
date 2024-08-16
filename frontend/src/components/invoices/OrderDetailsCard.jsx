import React from 'react'
import { Table } from 'react-bootstrap'
import { TableThead } from '../common'
import './Invoices.scss'
const tableHeadCols = [
   { key: '#' },
   { key: 'اسم المنتج' },
   { key: 'المقاس' },
   { key: 'الالوان' },
   { key: 'الكمية' },
   { key: 'السعر' },
   { key: 'اجمالى المبلغ' }
];
const OrderDetailsCard = ({ order }) => {
   return (
      <section className="invoice-card order-details-form rounded-2">
         <div className="head px-3 py-4 mb-1">
            <h4 className="mb-0">تفاصيل الطلب</h4>
         </div>
         <section className='p-3 my-1'>
            <Table striped bordered hover responsive className=''>
               <TableThead
                  cols={tableHeadCols}
               />
               <tbody>
                  {order?.items?.map((item, idx) => (
                     <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.size}</td>
                        <td>{item?.color}</td>
                        <td>{item?.quantity} قطعة </td>
                        <td>{item?.price} جنية </td>
                        <td>{parseFloat(item?.price) * parseFloat(item?.quantity)} جنية </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
            <div className='mt-5'>
               <div className='order-details-items d-flex mb-1'>
                  <span className='ms-2 fw-medium'>الخصم:</span>
                  <p>
                     {order?.discount} %
                  </p>
               </div>
               <div className='order-details-items d-flex mb-1'>
                  <span className='ms-2 fw-medium'>إجمالي الكمية:</span>
                  <p>
                     {order?.totalQuantity} قطعة
                  </p>
               </div>
               <div className='order-details-items d-flex mb-1'>
                  <span className='ms-2 fw-medium'>إجمالي السعر بعد الخصم:</span>
                  <p>
                     {order?.totalPrice} جنية
                  </p>
               </div>
               <div className='order-details-items mb-1 d-flex'>
                  <span className='ms-2  fw-medium'>تفاصيل الفاتورة:</span>
                  <p className='description flex-fill'>{order?.description}</p>
               </div>
            </div>
         </section>
      </section>
   )
}

export default OrderDetailsCard