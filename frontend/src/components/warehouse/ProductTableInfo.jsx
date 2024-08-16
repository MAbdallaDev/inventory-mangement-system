import React from 'react';
import Table from 'react-bootstrap/Table';
import { TableThead } from '../common';


const ProductTableInfo = ({ sizes }) => {
   const tableCols = [{ key: '#' }, { key: 'المقاس' }, { key: 'الالوان' }, { key: 'الكمية' }]
   return (
      <Table striped bordered hover responsive>
         <TableThead cols={tableCols} />
         <tbody>
            {
               sizes?.map((size, idx) => (
                  <React.Fragment key={size.id}>
                     {
                        size.colors.map((color, colorIndex) => (
                           <tr key={color.id}>
                              {colorIndex === 0 && (
                                 <>
                                    <td rowSpan={size.colors.length}>{idx + 1}</td>
                                    <td rowSpan={size.colors.length}>{size.size}</td>
                                 </>
                              )}
                              <td>{color.color}</td>
                              <td>{color.quantity} قطعة</td>
                           </tr>
                        ))
                     }
                  </React.Fragment>
               ))
            }
         </tbody>
      </Table>
   );
};

export default ProductTableInfo;
