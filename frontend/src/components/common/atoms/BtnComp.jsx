import React from 'react'
import { Button } from 'react-bootstrap'
import useMobileMedia from '../../../hooks/useMobileMedia'

const BtnComp = ({ type, variant, onclickFunc, classes, name , titleAttr , disabled }) => {
   const isMobile = useMobileMedia();
   return (
      <>
         <Button
            type={type||'button'}
            variant={`outline-${variant}`}
            className={`${isMobile && 'btn-sm'} ${classes}`}
            onClick={onclickFunc}
            title ={titleAttr} 
            disabled={disabled}
            >
            {name}
         </Button>
      </>
   )
}
export default BtnComp