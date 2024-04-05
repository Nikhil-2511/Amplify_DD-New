import React from 'react';
import FilterDropdown from '../../Component/FilterComponents/FilterDropdown';
import { trackGA4Event } from '../../utils/GAevents';
import { SORT_GA } from '../../constants/GAeventsConstants';

function SortByFilter({sortBy={}, handleSelect, sortByArr=[]}) {    

    function getLabelText() {
        let label = '', selectedFilter = sortBy;
        if(selectedFilter) {
            sortByArr?.forEach((element) => {
                if(sortBy.fieldName === element.fieldName && sortBy.direction === element.direction) {
                    label = element.value;
                }
            })
        }
        return label;
    }

    return (
        <div className='flex align-center'>
            <span className='text-12 text-black margin-r5'>Sort By:</span>
            <span>
                <FilterDropdown
                    label={getLabelText()} 
                    options={sortByArr} 
                    parentClass={'bg-F2F4F7 text-9BA2B3 padding-x5'}
                    handleSelect={(value) => handleSelect(value)}
                    className={"padding-y5 padding-x8 text-2E90FA"}
                />
            </span>
        </div>
    )
}

export default SortByFilter;