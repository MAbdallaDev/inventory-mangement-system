import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import { LinkComp } from '../common';
import { getProductById } from '../../services/apiService';
import ProductTableInfo from './ProductTableInfo';
import useDecumentTitle from '../../hooks/useDecumentTitle';

const ProductInfo = () => {
   const { id } = useParams();
   const [product, setProduct] = useState({});
   useDecumentTitle('مخزنك - تفاصيل المنتج')
   useEffect(() => {
      getProductData();
   }, [id])
   const getProductData = async () => {
      const reponse = await getProductById(id);
      setProduct(reponse.data);
   }
   return (
      <section className='product-info-page'>
         <Container>
            <Row className='mb-3'>
               <Col xs={12} sm={8} md={9} className='mb-3 mb-md-0'>
                  <h3 className='pb-1'>{`عرض تفاصيل عن المنتج`} </h3>
               </Col>
               <Col xs={12} sm={4} md={3} className='text-md-center'>
                  <LinkComp path={`/تعديل-منتج/${product?.id}`} vairaint='success' name='تعديل المنتج' titleAttr='تعديل في هذا المنتج' />
               </Col>
            </Row>
            <Row>
               <Col xs={12}>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>كود المنتج :</h5>
                     <p className='mb-0'>{product?.code || '#0000'}</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>اسم المنتج :</h5>
                     <p className='mb-0'>{product?.name || 'غير معروف'}</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>تاريخ الاضافة  :</h5>
                     <p className='mb-0'>{product?.created_at || 'غير معروف'}</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>سعر الجملة :</h5>
                     <p className='mb-0'>{product?.price} جنية</p>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0'>الكمية المتاحة :</h5>
                     <p className='mb-0'>{product?.total_quantity || 'غير معروف'} قطعة</p>
                  </div>
                  <div className="d-flex gap-2 py-2 mb-2 item">
                     <h5 className='mb-0 mt-1'>تفاصيل المنتج :</h5>
                     <textarea
                        rows="5"
                        id="product-description"
                        className="form-control"
                        value={product?.details|| 'غير معروف'}
                     ></textarea>
                  </div>
                  <div className="align-items-center d-flex gap-2 py-2 mb-2 item">
                     <Link to='/' > لمعرفة التعديلات التى جرت على هذا المنتج </Link>
                  </div>
               </Col>
               <Col sx={12} md={10} lg={7} className='mt-4'>
                  <ProductTableInfo sizes={product?.sizes} />
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default ProductInfo