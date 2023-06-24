import React from 'react';
import "./Pagination.scss";
import Button  from '../../UI/Button/Button';



const Pagination = ({handlePreviousPage, handleNextPage, pageNumber, endIndex, filteredCountries, sortedCountries, sortedCountriesByArea, filterCountriesByRegion}) => {

    
    return (
        <div className='page__wrap flex flex-jc-se'>
            <Button onClick={handlePreviousPage} disabled={pageNumber === 1}>Previous page</Button>
            <Button onClick={handleNextPage} 
                disabled={endIndex >= (
                    sortedCountries? sortedCountries.length : filteredCountries.length,
                    sortedCountriesByArea ? sortedCountriesByArea.length : filteredCountries.length,
                    filterCountriesByRegion ? filterCountriesByRegion.length : filteredCountries.length
                    )}
            >Next page</Button>
        </div>
    );

};

export default Pagination;