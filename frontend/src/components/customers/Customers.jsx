import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { BtnComp, LinkComp, TableThead } from '../common'
import { FaEye, FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import AddCustomerPop from './AddCutomerPop';
import { useDispatch, useSelector } from 'react-redux';
import PaginationComp from '../common/atoms/PaginationComp'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteCustomer, getCustomers } from '../../store/slices/CustomerSlice';
import './customers.scss'
import { selectUserRole } from '../../store/slices/authSlice';
import useDecumentTitle from '../../hooks/useDecumentTitle';

const MySwal = withReactContent(Swal);
const tableHeadCols = [
   { key: '#' },
   { key: 'اسم العميل' },
   { key: 'رقم التليفون' },
   { key: 'العنوان' },
   { key: 'العمليات' }
];
const Customers = () => {
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [editedCustomerData, setEditedCustomerData] = useState({});
   const { customers, currentPage, totalPages, perPage, totalCustomers } = useSelector((state) => state?.customers);
   const currentUserRole = useSelector(selectUserRole)
   useDecumentTitle('مخزنك - العملاء');

   useEffect(() => {
      dispatch(getCustomers({}));
   }, [dispatch])

   const handleCustomerDelete = async (id) => {
      if (currentUserRole === 'user') {
         Swal.fire({
            icon: 'error',
            text: 'انت لست مدير لتستطيع حذف عميل',
         });
         return;
      }
      MySwal.fire({
         title: 'سيتم حذف العميل!',
         text: 'في حالة حذف العميل سيتم حذف الفواتير الخاصة به',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'نعم، احذفه!',
         cancelButtonText: 'إلغاء'
      }).then(async (res) => {
         if (res.isConfirmed) {
            try {
               const response = await dispatch(deleteCustomer(id)).unwrap();
               MySwal.fire({
                  icon: 'success',
                  text: `${response?.message}`,
                  showConfirmButton: false,
                  timer: 1500
               });
               dispatch(getCustomers({}));
            } catch (err) {
               console.log(err);
               MySwal.fire({
                  icon: 'error',
                  text: 'حدث خطأ أثناء الحذف',
                  confirmButtonColor: '#3085d6'
               });
            }
         }
      });
   };

   return (
      <section className='customers-page'>
         <Container>
            <Row className='mb-3'>
               <Col xs={12} sm={8} md={9}>
                  <div className="sec-header">
                     <h2 className='pb-2'>جميع العملاء</h2>
                     <p className="mb-0">جميع العملاء المتعاقدين معهم حاليا</p>
                  </div>
               </Col>
               <Col xs={12} sm={4} md={3} className='text-md-center mt-3 mt-sm-0'>
                  <BtnComp
                     variant='success'
                     name='اضافة عميل'
                     titleAttr='اضافة عميل جديد'
                     onclickFunc={() => {
                        setShow(true)
                        setIsEditing(false)
                     }} />
               </Col>
            </Row>
            <Row>
               <Col md={8} >
                  <Table striped bordered hover responsive className='mb-1'>
                     <TableThead cols={tableHeadCols} />
                     <tbody>
                        {customers?.map((item, idx) => (
                           <tr key={item?.id || idx}>
                              <td>{(idx + 1) + (perPage * (currentPage - 1))}</td>
                              <td>{item?.name}</td>
                              <td>{item?.phone}</td>
                              <td>{item?.address}</td>
                              <td>
                                 <div className="d-flex flex-column flex-md-row gap-2">
                                    <LinkComp
                                       path={`/عميل/${item?.id}`}
                                       vairaint='primary'
                                       name={<FaEye />}
                                       titleAttr='عرض تفاصيل عن العميل' />
                                    <BtnComp
                                       variant='success'
                                       name={<FaEdit />}
                                       titleAttr='تعديل هذة العميل'
                                       onclickFunc={() => {
                                          setShow(true);
                                          setIsEditing(true);
                                          setEditedCustomerData(item);
                                       }} />
                                    <BtnComp
                                       variant='danger'
                                       name={<FaRegTrashCan />}
                                       titleAttr='حذف هذة العميل'
                                       onclickFunc={() => handleCustomerDelete(item?.id)}
                                    />
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
                  <PaginationComp
                     totalPages={totalPages}
                     currentPage={currentPage}
                     fetchingData={getCustomers}
                  />
               </Col>
               <Col>
                  <AddCustomerPop
                     show={show}
                     isEditing={isEditing}
                     editedCustomerData={editedCustomerData}
                     handleClose={() => setShow(false)}
                  />
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Customers