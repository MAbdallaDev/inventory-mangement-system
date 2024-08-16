import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import '../common.scss'
const PaginationComp = ({ totalPages, currentPage, fetchingData, invoiceDate }) => {
   const dispatch = useDispatch()

   const handlePageChange = (pageNumber) => {
      if (invoiceDate)
         dispatch(fetchingData({ pageNumber, date: invoiceDate }));
      else dispatch(fetchingData({ pageNumber }));
   }
   return (
      <>
         <Pagination className='d-flex flex-wrap row-gap-1'>
            {[...Array(totalPages).keys()].map(number => (
               <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
               >
                  {number + 1}
               </Pagination.Item>
            ))}
         </Pagination>
      </>
   )
}

export default PaginationComp