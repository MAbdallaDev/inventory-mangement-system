import React from 'react'
import { Link } from 'react-router-dom'
import useMobileMedia from '../../../hooks/useMobileMedia'

const LinkComp = ({ path, vairaint,name, titleAttr }) => {
   const isMobile = useMobileMedia();
   return (
      <>
         <Link
            to={path}
            className={`btn btn-outline-${vairaint} fw-semibold ${isMobile && 'btn-sm'}`}
            title={titleAttr}
         >{name}</Link>
      </>
   )
}

export default LinkComp