import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
const unique = nanoid(2)
const StatisticsCard = ({icon, header, number }) => {
   return (
      <div
         className="feature-card card flex-row align-items-center gap-3 p-3 mb-3"
         key={unique}
      >
         {icon}
         <div className="card-body p-0">
            <h4 className='fw-semibold mb-2 pb-1'>{header}</h4>
            <p className='mb-0 fw-semibold'>{number} جنية</p>
         </div>
      </div>
   )
}

export default StatisticsCard