import React from 'react'
import { Link } from 'react-router-dom'

const FeatureCard = ({ path, header,title, icon, classes }) => {
   return (
      <>
         <Link
            to={path}
            className={`feature-card card flex-row align-items-center gap-3 p-3 mb-3  ${classes || ''}`}>
            {icon}
            <div className="card-body p-0">
               <h4 className='fw-semibold mb-2 pb-1'>{header}</h4>
               <p className='mb-0 fw-semibold'>{title}</p>
            </div>
         </Link>
      </>
   )
}

export default FeatureCard