import React from 'react'
import PropTypes from 'prop-types';

const TableThead = ({ cols }) => {
   return (
      <>
         <thead>
            <tr>
               {
                  cols?.map((col, idx) => (
                     <th key={`${col?.key}-${idx}`}>{col?.key}</th>
                  ))
               }
            </tr>
         </thead>
      </>
   )
}
TableThead.propTypes = {
   cols: PropTypes.arrayOf(
      PropTypes.shape({
         key: PropTypes.string.isRequired,
      })
   ).isRequired,
};

export default TableThead