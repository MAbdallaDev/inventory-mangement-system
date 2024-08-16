import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { BtnComp, LinkComp, SectionHeader, TableThead } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProducts, removeProduct } from '../../store/slices/productSlice';
import PaginationComp from '../common/atoms/PaginationComp';
import { FaEye, FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './warehouse.scss'
import { selectUserRole } from '../../store/slices/authSlice';
import useDecumentTitle from '../../hooks/useDecumentTitle';
const MySwal = withReactContent(Swal);
const tableHeadCols = [
   { key: '#' },
   { key: 'الكود' },
   { key: 'الاسم' },
   { key: 'التاريخ' },
   { key: 'الكمية المتوفرة' },
   { key: 'السعر' },
   { key: 'العمليات' }
];
const AllProducts = () => {
   const { products, currentPage, totalPages, perPage } = useSelector(state => state?.products);
   const currentUserRole = useSelector(selectUserRole)
   const dispatch = useDispatch();
   useDecumentTitle('مخزنك - جميع المنتجات')

   useEffect(() => {
      dispatch(fetchingProducts({}));
   }, [dispatch])
   const handleRemoveProduct = async (productId) => {
      if (currentUserRole === 'user') {
         Swal.fire({
            icon: 'error',
            text: 'المدير فقط من يستطيع الحذف',
         });
         return;
      }
      try {
         await MySwal.fire({
            text: `سيتم حذف المنتج !`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء'
         }).then((result) => {
            if (result.isConfirmed) {
               dispatch(removeProduct(productId))
                  .then((res) => {
                     dispatch(fetchingProducts({}));
                     console.log(res?.payload?.message);
                     MySwal.fire({
                        icon: 'success',
                        text: `${res?.payload?.message}`,
                        showConfirmButton: false,
                        timer: 1500
                     });
                  })
            }
         })
      }
      catch (error) {
         MySwal.fire({
            icon: 'error',
            text: 'حدث خطأ أثناء الحذف ',
            confirmButtonColor: '#3085d6',
         });
      };
   }
   return (
      <section className='p-2 all-products-page'>
         <Container className='d-flex flex-column gap-3'>
            <SectionHeader
               header='جميع المنتجات '
               para='جميع المنتجات المتاحة فى المخزن حاليا'
               btn={{ path: '/اضافة-منتج', name: 'اضافة منتج', titleAttr: 'اضافة منتج جديد' }} />
            <Row>
               <Table striped bordered responsive>
                  <TableThead cols={tableHeadCols} />
                  <tbody>
                     {(
                        products?.map((product, idx) => (
                           <tr key={idx}>
                              <td>{(idx + 1) + (perPage * (currentPage - 1))}</td>
                              <td>{product?.code || '#000'}</td>
                              <td>{product?.name}</td>
                              <td>{product?.created_at}</td>
                              <td>{product?.total_quantity || 0} قطعه</td>
                              <td>{product?.price} جنيه</td>
                              <td >
                                 <div className="d-flex flex-column flex-md-row gap-2">
                                    <LinkComp
                                       path={`/منتج/${product?.id}`}
                                       vairaint='primary'
                                       name={<FaEye />}
                                       titleAttr='عرض تفاصيل عن المنتج' />
                                    <LinkComp
                                       path={`/تعديل-منتج/${product?.id}`}
                                       vairaint='success'
                                       name={<FaEdit />}
                                       titleAttr='تعديل هذا المنتج' />
                                    <BtnComp
                                       variant='danger'
                                       name={<FaRegTrashCan />}
                                       titleAttr='حذف هذا المنتج'
                                       onclickFunc={() => handleRemoveProduct(product?.id)} />
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </Table>
               <div className="py-1"></div>
               <PaginationComp
                  totalPages={totalPages}
                  currentPage={currentPage}
                  fetchingData={fetchingProducts}
               />
            </Row>
         </Container>
      </section>
   )
}

export default AllProducts