import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { SectionHeader } from '../common';
import './warehouse.scss'
import AddProductForm from './AddProductForm';
import useDecumentTitle from '../../hooks/useDecumentTitle';
const AddProduct = () => {
   useDecumentTitle('مخزنك - اضافة منتج')
   return (
      <section className="add-product-page p-2">
         <Container >
            <SectionHeader
               header='اضافة منتج'
               para='اضافة منتج جديد الى المخزن'
               btn={{ path: '/منتجات', name: 'عرض المنتجات', titleAttr: 'عرض جميع المنتجات' }} />
            <Row>
               <AddProductForm />
            </Row>
         </Container>
      </section>
   );
}

export default AddProduct
