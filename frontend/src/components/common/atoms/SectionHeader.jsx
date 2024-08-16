import React from 'react'
import { Col, Row } from 'react-bootstrap'
import LinkComp from './LinkComp'

const SectionHeader = ({ header, para, btn }) => {
   return (
      <Row className='mb-3'>
         <Col xs={12} sm={8} md={9} className='mb-3 mb-md-0'>
            <div className="sec-header">
               <h2 className='pb-2'>{header} </h2>
               <p className='mb-0'>{para}</p>
            </div>
         </Col>
         <Col xs={12} sm={4} md={3} className='text-md-center'>
            <LinkComp
               path={btn?.path}
               vairaint='success'
               name={btn?.name}
               titleAttr={btn?.titleAttr} />
         </Col>
      </Row>
   )
}
export default SectionHeader