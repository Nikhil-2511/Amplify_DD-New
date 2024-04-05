import React from 'react';
import { useSelector } from 'react-redux';
import SortByFilter from '../SortByFilter';

function FilterResultStrip({hideSortByFilter, sortByArr, sortBy, handleSortSelect}) {
    const filterStore = useSelector((state) => state.filterStore);

    return (
        <div className='flex align-center col-gap-15'>
            <span className='text-black font-500 text-12'>{`${filterStore?.totalElements || 0} ${filterStore?.totalElements > 1 ? 'results' : 'result'}`}</span>
            {
                !hideSortByFilter &&
                <SortByFilter handleSelect={handleSortSelect} sortByArr={sortByArr} sortBy={sortBy} />
            }
        </div>
    )
}

export default FilterResultStrip;