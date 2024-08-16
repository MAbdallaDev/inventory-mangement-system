import React from 'react'
import { Table } from 'react-bootstrap'
import { BtnComp, LinkComp, TableThead } from '../common'
import { FaEye, FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInvoice } from '../../store/slices/invoiceSlice';
import { selectUserRole } from '../../store/slices/authSlice';
import './Invoices.scss'
const MySwal = withReactContent(Swal);
const InvoicesTable = ({ tableHeadCols, invoices, parentComp, paginate }) => {
   const dispatch = useDispatch();
   const currentUserRole = useSelector(selectUserRole)

   const handleInvoiceDeletion = async (invoiceId) => {
      if (currentUserRole === 'user') {
         Swal.fire({
            icon: 'error',
            text: 'انت لست مدير لتستطيع حذف الفاتورة',
         });
         return;
      }
      // handle delete invoice logic here
      MySwal.fire({
         text: 'سيتم حذف الفاتورة!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'نعم، احذفه!',
         cancelButtonText: 'إلغاء'
      }).then(async (res) => {
         if (res.isConfirmed) {
            try {
               const response = await dispatch(deleteInvoice(invoiceId)).unwrap();
               MySwal.fire({
                  icon: 'success',
                  text: `${response?.message || 'تم حذف الفاتورة'}`,
                  showConfirmButton: false,
                  timer: 1800
               }).then(() => {
                  window.location.reload(); // Reload the page after successful deletion
               });
            } catch (error) {
               console.log(error);
               MySwal.fire({
                  icon: 'error',
                  text: 'حدث خطأ أثناء الحذف',
                  confirmButtonColor: '#3085d6'
               });
            }
         }
      })
   }
   return (
      <div className='invoice-table'>
         <Table striped bordered responsive>
            <TableThead cols={tableHeadCols} />
            <tbody>
               {invoices?.map((item, idx) => (
                  <tr key={item?.id || idx}>
                     {paginate?.currentPage ?
                        <td>{(idx + 1) + (paginate?.perPage * (paginate?.currentPage - 1))}</td>
                        :
                        <td>{idx + 1}</td>
                     }
                     <td>{item?.invoice_code}</td>
                     {parentComp !== 'customer' &&
                        <td>{item?.client?.name}</td>
                     }
                     <td>{item?.invoice_date_display || item?.invoice_date}</td>
                     <td>{item?.payment_method}</td>
                     <td>{item?.total_price} جنية </td>
                     <td>
                        <div className="d-flex flex-column flex-md-row gap-2">
                           <LinkComp
                              path={`/فاتورة/${item?.id}`}
                              vairaint='primary'
                              name={<FaEye />}
                              titleAttr='عرض تفاصيل عن الفاتورة' />
                           <LinkComp
                              path={`/تعديل-فاتورة/${item?.id}`}
                              vairaint='success'
                              name={<FaEdit />}
                              titleAttr='تعديل هذة الفاتورة'
                           />
                           <BtnComp
                              variant='danger'
                              name={<FaRegTrashCan />}
                              titleAttr='حذف هذة الفاتورة'
                              onclickFunc={() => handleInvoiceDeletion(item?.id)}
                           />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </div>
   )
}

export default InvoicesTable