import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BtnComp, TableThead } from '../common'
import Table from 'react-bootstrap/Table';
import UserPopModal from './UserPopModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser, selectRoles } from '../../store/slices/userSlice';
import { selectUserRole } from '../../store/slices/authSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './users.scss'
import useDecumentTitle from '../../hooks/useDecumentTitle';

const MySwal = withReactContent(Swal);

const tableHeadCols = [
   { key: '#' },
   { key: 'الاسم ' },
   { key: 'البريد الاكترونى' },
   { key: 'الوظيفة' },
   { key: 'العمليات' }
];
const Users = () => {
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);
   const [userData, setUserData] = useState({
      name: '',
      email: '',
      role: ''
   });
   const { users } = useSelector(state => state?.user);
   const currentUser = useSelector(state => state?.auth?.user);
   const roles = useSelector(selectRoles);
   const currentUserRole = useSelector(selectUserRole)
   useDecumentTitle('مخزنك - المستخدمين');

   useEffect(() => {
      dispatch(getUser())
   }, [dispatch])
   const handleEditUser = (item) => {
      if (currentUser?.role !== 'manger' && currentUser?.id !== item?.id) {
         Swal.fire({
            icon: 'error',
            text: 'تستطيع تعديل فقط في بياناتك',
         });
         return;
      }
      setShow(true);
   }
   const handleUserDeletion = async (userId) => {
      if (currentUserRole === 'user') {
         Swal.fire({
            icon: 'error',
            text: 'المدير فقط من يستطيع الحذف',
         });
         return;
      }
      MySwal.fire({
         text: 'سيتم حذف المستخدم!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'نعم، احذفه!',
         cancelButtonText: 'إلغاء'
      }).then(async (res) => {
         if (res.isConfirmed) {
            try {
               const response = await dispatch(deleteUser(userId)).unwrap();
               MySwal.fire({
                  icon: 'success',
                  text: `${response?.message}`,
                  showConfirmButton: false,
                  timer: 1500
               });
               dispatch(getUser())
            } catch (e) {
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
      <section className='users-page'>
         <Container>
            <Row className='mb-3'>
               <Col xs={12} sm={8} md={9}>
                  <div className="sec-header">
                     <h2 className='pb-2'>جميع المستخدمين</h2>
                     <p className="mb-0">جميع المستخدمين للموقع حاليا</p>
                  </div>
               </Col>
            </Row>
            <Row>
               <Col md={10} >
                  <Table striped bordered hover responsive>
                     <TableThead cols={tableHeadCols} />
                     <tbody>
                        {users?.map((item, idx) => (
                           <tr key={item?.id}>
                              <td>{idx + 1}</td>
                              <td>{item?.name}</td>
                              <td>{item?.email}</td>
                              <td>{roles[item?.role]}</td>
                              <td>
                                 <div className="d-flex flex-column flex-md-row gap-2">
                                    <BtnComp
                                       variant='success'
                                       name='تعديل'
                                       titleAttr='تعديل هذة المستخدم'
                                       onclickFunc={() => {
                                          handleEditUser(item)
                                          setUserData(item);
                                       }}
                                    />
                                    <BtnComp
                                       variant='danger'
                                       name='حذف'
                                       titleAttr='حذف هذة المستخدم'
                                       onclickFunc={() => handleUserDeletion(item?.id)}
                                    />
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </Col>
               <Col md={9} className='text-danger mt-3'>
                  <h6>*ملحوظة:</h6>
                  <ol className='text-danger me-5 ps-0'>
                     <li >
                        <small className="fw-semibold"> المدير فقط من يستطيع تعديل مستخدم [مدير او موظف] </small>
                     </li>
                     <li >
                        <small className="fw-semibold">  الموظف غير قادر على حذف [الفواتير او المنتجات او مستخدمين او عملاء] </small>
                     </li>
                  </ol>
               </Col>
               <Col>
                  <UserPopModal
                     show={show}
                     userData={userData}
                     setUserData={setUserData}
                     handleClose={() => setShow(false)}
                  />
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Users