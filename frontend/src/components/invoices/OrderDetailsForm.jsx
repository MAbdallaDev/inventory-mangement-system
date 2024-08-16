import React from 'react'
import useOrderDetails from '../../hooks/useOrderDetails';
import { Col, Form, Row } from 'react-bootstrap';
import { FaRegTrashCan } from "react-icons/fa6";
import { BtnComp } from '../common';
import ProductNameInOrder from './ProductNameInOrder';

const OrderDetailsForm = ({ orderDetails, setOrderDetails, disableEditing }) => {
   const {
      totalQty,
      subTotalPrice,
      totalPrice,
      productDetails,
      colorOptions,
      maxQuantities,
      handleAddItem,
      handleRemoveItem,
      handleItemChange,
   } = useOrderDetails(orderDetails, setOrderDetails, disableEditing);

   return (
      <section className="invoice-card order-details-form rounded-2">
         <div className="head px-3 py-4 mb-1">
            <h4 className="mb-0">تفاصيل الطلب</h4>
         </div>
         <Form className='p-3'>
            <small className='text-danger fw-semibold'>  *ملحوظة: ادخل بيانات المنتج بالترتيب [الاسم ثم المقاس ثم اللون .... ]</small>
            {orderDetails?.items?.map((item, idx) => (
               <div className="form-item d-md-flex my-4" key={idx}>
                  <Row >
                     <Col sm={6} md={2} className="py-2 py-md-0">
                        <ProductNameInOrder
                           orderDetails={orderDetails}
                           setOrderDetails={setOrderDetails}
                           item={item}
                           idx={idx}
                           handleItemChange={handleItemChange}
                        />
                     </Col>
                     <Col sm={6} md={2} className="py-2 py-md-0">
                        <Form.Group controlId={`item-name-${idx}`} className="mb-0">
                           <Form.Control
                              as="select"
                              value={item.size}
                              placeholder='المقاس'
                              title='اختر مقاس المنتج'
                              onChange={(e) => handleItemChange(idx, 'size', e.target.value)}
                           >
                              {disableEditing && <option value="">{item?.size}</option>}
                              <option value="">اختر المقاس</option>
                              {productDetails[idx]?.sizes?.map((size) => (
                                 <option key={size?.id} value={size?.id}>{size?.size}</option>
                              ))}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col sm={6} md={2} className="py-2 py-md-0">
                        <Form.Group controlId={`item-name-${idx}`} className="mb-0">
                           <Form.Control
                              as='select'
                              value={item.color}
                              placeholder='اللون'
                              title='ادخل لون المنتج'
                              onChange={(e) => handleItemChange(idx, 'color', e.target.value)}
                           >
                              {disableEditing && <option value=''>{item?.color}</option>}
                              <option value=''>اختر اللون</option>
                              {colorOptions[idx]?.map(color => (
                                 <option key={color?.id} value={color?.id}>{color?.color}</option>
                              ))}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col sm={6} md={2} className="py-2 py-md-0">
                        <Form.Group controlId={`item-name-${idx}`} className="mb-0">
                           <Form.Control
                              type="number"
                              value={item.quantity}
                              min={1}
                              max={maxQuantities[idx] || 0} // Set max based on selected color
                              placeholder='الكمية'
                              title='ادخل عدد قطع المنتج'
                              onChange={(e) => {
                                 const parsedValue = parseInt(e.target.value, 10);
                                 handleItemChange(idx, 'quantity', isNaN(parsedValue) ? 1 : parsedValue);
                              }}
                           />
                           {maxQuantities[idx] >= 0 &&
                              <Form.Text className="text-danger message">
                                 {parseInt(item.quantity) > maxQuantities[idx]
                                    ? <>  الكمية اكبر من المتاحة</>
                                    : <>المتاحة: {maxQuantities[idx] - item.quantity} </>
                                 }
                              </Form.Text>
                           }
                        </Form.Group>
                     </Col>
                     <Col sm={6} md={2} className="py-2 py-md-0">
                        <Form.Group controlId={`item-name-${idx}`} className="mb-0">
                           <Form.Control
                              type="number"
                              value={item.price}
                              min={productDetails[idx]?.price}
                              placeholder='السعر'
                              title='ادخل سعر المنتج بالجنية'
                              onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                           />
                           {maxQuantities[idx] >= 0 &&
                              <Form.Text className="text-danger message">
                                 {(parseFloat(item.price) || productDetails[idx]?.price) < productDetails[idx]?.price
                                    ? <>السعر اقل من سعر التكلفة</>
                                    : <>التكلفة: {productDetails[idx]?.price}</>}
                              </Form.Text>
                           }
                        </Form.Group>
                     </Col>
                     <Col sm={6} md={2} className="py-2 py-md-0">
                        <Form.Group controlId={`item-name-${idx}`} className="mb-0">
                           <Form.Control
                              type="number"
                              value={item.price * item.quantity || ''}
                              placeholder='اجمالى المبلغ'
                              title='اجمالى المبلغ'
                              readOnly
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <div className=" d-flex delete-wrapper justify-content-md-end justify-content-start">
                     <BtnComp
                        variant='danger'
                        classes=' d-block d-md-none my-2'
                        onclickFunc={() => handleRemoveItem(idx)}
                        titleAttr='حذف المنتج من الفاتورة'
                        name='حذف المنتج'
                        disabled={orderDetails?.items?.length === 1}
                     />
                     <FaRegTrashCan
                        className={`d-none d-md-block delete-btn text-danger`}
                        style={{ opacity: `${orderDetails?.items?.length === 1 ? '0.65' : '1'}` }}
                        onClick={() => {
                           if (orderDetails?.items?.length !== 1) {
                              handleRemoveItem(idx)
                           }
                        }}
                     />
                  </div>
               </div>
            ))}
            <BtnComp
               variant='success'
               classes='my-2'
               onclickFunc={handleAddItem}
               name='إضافة منتج اخر '
               titleAttr='إضافة منتج اخر الى الفاتورة'
            />
            <Row className='gap-4 gap-md-3 mt-4'>
               <Col md={7}>
                  <Form.Group controlId="order-description" className="">
                     <Form.Label> تفاصيل الفاتورة</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows={3}
                        value={orderDetails?.description}
                        onChange={(e) => setOrderDetails({ ...orderDetails, description: e.target.value })}
                     />
                  </Form.Group>
               </Col>
               <Col>
                  <div className="d-flex flex-column gap-2 item">
                     <Form.Group controlId={`item-name-320`} className="mb-1 d-flex align-items-center gap-3 discount">
                        <Form.Label> الخصم [%]</Form.Label>
                        <Form.Control
                           type="number"
                           value={orderDetails?.discount}
                           onChange={(e) => setOrderDetails({ ...orderDetails, discount: e.target.value })}
                        />
                     </Form.Group>
                     <div className='d-flex'>
                        <span className='ms-1'>إجمالي الكمية:</span>
                        <p>
                           {totalQty} قطعة
                        </p>
                     </div>
                     <div className='d-flex'>
                        <span className='ms-1'>إجمالي السعر قبل الخصم:</span>
                        <p>
                           {subTotalPrice} قطعة
                        </p>
                     </div>
                     <div className='d-flex'>
                        <span className='ms-1'>إجمالي السعر بعد الخصم:</span>
                        <p>
                           {totalPrice} جنية
                        </p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Form>
      </section>
   );
}

export default OrderDetailsForm