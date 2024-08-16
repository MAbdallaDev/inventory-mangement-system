import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/apiService'
import EditProductForm from './EditProductForm'
import useDecumentTitle from '../../hooks/useDecumentTitle'
const EditProduct = () => {
   const { id } = useParams();
   const [product, setProduct] = useState()
   useDecumentTitle('مخزنك - تعديل في المنتج')
   useEffect(() => {
      getProduct()
   }, [id])
   const getProduct = async () => {
      try {
         const response = await getProductById(id);
         setProduct(response.data)
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <section className='edit-product-page'>
         <Container>
            <h2 className='pb-2'> تعديل في المنتج {product?.code} </h2>
            <Row>
               <EditProductForm isEditing={true} editedProductData={product} />
            </Row>
         </Container>
      </section>
   )
}

export default EditProduct