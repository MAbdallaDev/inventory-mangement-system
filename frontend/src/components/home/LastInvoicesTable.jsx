import React from 'react'
import { Table } from 'react-bootstrap'
import { LinkComp, TableThead } from '../common'
import { FaEye } from "react-icons/fa6";
const tableHeadCols = [
   { key: '#' },
   { key: 'اسم العميل' },
   { key: 'التاريخ' },
   { key: 'إجمالي السعر' },
   { key: 'العمليات' }
];
const LastInvoicesTable = ({ invoices }) => {
   return (
      <Table striped bordered responsive>
         <TableThead cols={tableHeadCols} />
         <tbody>
            {invoices?.map((item, idx) => (
               <tr key={item?.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{item?.client?.name}</td>
                  <td>{item?.invoice_date_display}</td>
                  <td>{item?.total_price} جنية </td>
                  <td>
                     <LinkComp
                        path={`/فاتورة/${item?.id}`}
                        vairaint='primary'
                        name={<FaEye />}
                        titleAttr='عرض تفاصيل عن الفاتورة' />
                  </td>
               </tr>
            ))}
         </tbody>
      </Table>
   )
}

export default LastInvoicesTable