import React, { useState } from 'react'
import { Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import useMobileMedia from '../../hooks/useMobileMedia';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AddModel from './AddModelPop';
import './Settings.scss'
import PaginationComp from '../common/atoms/PaginationComp';
import { TableThead } from '../common';
const MySwal = withReactContent(Swal);
const SettingModel = ({
   modelType,
   modelText,
   data,
   totalPages,
   perPage,
   currentPage,
   fetchingData,
   removeFunction,
   popTitle,
   popAddFunc,
   popEditFunc,
   popFetchFunc }) => {
   const isMobile = useMobileMedia();
   const dispatch = useDispatch();
   const tableCols = [{ key: '#' }, { key: 'الاسم' }, { key: 'تعديل' }]
   const [showPop, setShowPop] = useState(false);
   const [popType, setPopType] = useState('')
   const [itemData, setItemData] = useState({});
   const handlePopClose = () => { setShowPop(false) }
   const handleRemoveItem = (itemId) => {
      MySwal.fire({
         text: `سيتم حذف ${modelType?.ar} !`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         confirmButtonText: 'نعم، احذفه!',
         cancelButtonColor: '#d33',
         cancelButtonText: 'إلغاء'
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(removeFunction(itemId))
               .then((res) => {
                  dispatch(fetchingData({}));
                  MySwal.fire({
                     icon: 'success',
                     text: `${res?.payload?.message}`,
                     showConfirmButton: false,
                     timer: 1500
                  });
               })
         }
      })
         .catch((error) => {
            console.error(`Failed to remove ${modelType?.ar}:`, error);
            MySwal.fire({
               icon: 'error',
               text: 'حدث خطأ أثناء الحذف ',
               confirmButtonColor: '#3085d6',
            });
         });
   }
   return (
      <section className='color-setting'>
         <Container>
            <Row className='mb-3'>
               <Col xs={12} sm={8} md={9}>
                  <div className="sec-header">
                     <h2 className='pb-2'>{modelText?.header}</h2>
                  </div>
               </Col>
               <Col xs={12} sm={4} md={3} className='mt-3 mt-sm-0'>
                  {/* Add New Item */}
                  <Button
                     variant="outline-success"
                     className={`submit-btn ${isMobile && 'btn-sm'}`}
                     onClick={() => {
                        setPopType('اضافة')
                        setShowPop(true)
                     }}
                  >{modelText?.btn}</Button>
               </Col>
            </Row>
            <Row className=''>
               <Col sx={12} md={6} lg={5}>
                  <Table striped bordered hover>
                     <TableThead cols={tableCols} />
                     <tbody>
                        {
                           data?.map((item, index) => (
                              <tr key={item?.id}>
                                 <td>
                                    {(index + 1) + (((currentPage || 1) - 1) * (perPage || 1))}
                                 </td>
                                 <td>{item?.name}</td>
                                 <td>
                                    <div className='d-flex align-items-center gap-2'>
                                       {/* edit Item */}
                                       <Button
                                          variant="outline-primary"
                                          className={`submit-btn ${isMobile && 'btn-sm'}`}
                                          onClick={() => {
                                             setPopType('تعديل')
                                             setItemData(item)
                                             setShowPop(true)
                                          }}
                                       >تعديل </Button>
                                       <Button
                                          variant="outline-danger"
                                          className={`submit-btn ${isMobile && 'btn-sm'}`}
                                          onClick={() => { handleRemoveItem(item?.id) }}
                                       >حذف</Button>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        }
                     </tbody>
                  </Table>
                  {modelType?.en === 'color' &&
                     <PaginationComp
                        totalPages={totalPages}
                        currentPage={currentPage}
                        fetchingData={fetchingData}
                     />
                  }
               </Col>
               <Col sx={12} md={5}>
                  <AddModel
                     show={showPop}
                     handleClose={handlePopClose}
                     popType={popType}
                     modelType={modelType}
                     popTitle={popTitle}
                     itemData={itemData}
                     popAddFunc={popAddFunc}
                     popEditFunc={popEditFunc}
                     popFetchFunc={popFetchFunc}
                  />
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default SettingModel