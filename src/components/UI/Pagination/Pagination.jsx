import React from 'react';
import {getPagesArray} from '../../utils/pageCount';
import "./Pagination.scss";



const Pagination = ({totalPages, page, changePage}) => {
    const pagesArray = getPagesArray(totalPages);
    
    if (totalPages <= 0) {
        return null;
    }
   
    return (
        <div className='page__wrap flex flex-jc-c'>
      {page > 1 && (
        <span onClick={() => changePage(page - 1)} className='page'>
          Previous
        </span>
      )}
      {pagesArray.map((p, i) => {
        return (
          <span
            key={i}
            onClick={() => changePage(p)}
            className={page === p ? 'page page__current' : 'page'}
          >
            {p}
          </span>
        );
      })}
      {page < totalPages && (
        <span onClick={() => changePage(page + 1)} className='page'>
          Next
        </span>
      )}
    </div>
    );
};

export default Pagination;