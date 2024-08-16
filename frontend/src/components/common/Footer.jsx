import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import useMobileMedia from '../../hooks/useMobileMedia';
import { useSelector } from 'react-redux';
const Footer = () => {
   const isMobile = useMobileMedia();
   const sidebarCollapse = useSelector((state) => state?.sidebar.collapsed);
   const token = useSelector(state => state?.auth?.token);
   return (
      <footer className='py-3 px-md-3 mt-4' style={{ marginRight: !token ? '0px' : (sidebarCollapse || isMobile) ? '80px' : '280px' }}>
         <Container>
            <Row>
               <Col className='align-items-center d-flex flex-column flex-md-row gap-3 justify-content-md-between'>
                  <p className='mb-0 d-flex align-items-center'>
                     <strong className='text-primary fs-5 fw-bold mb-0 ms-2'>مخزنك</strong>
                     2024© جميع الحقوق محفوظة
                  </p>
                  {/* <p className='mb-0'>© 2024 مخزنك. جميع الحقوق محفوظة.</p> */}
                  <p className='mb-0 us'>
                     تم تطويره بواسطة <a href='https://www.linkedin.com/in/mostafa-abdallah0/' target='_blanck'>مصطفى عبد الله</a> و
                     <a href='https://www.linkedin.com/in/ahmed-ali-1472731b8/' target='_blanck'>احمد على</a>
                  </p>
               </Col>
            </Row>
         </Container>
      </footer>
   )
}

export default Footer