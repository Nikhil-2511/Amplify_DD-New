import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterComponent from '../../FilterComponents';
import './style.scss';
import FilterResultStrip from '../../../CommonComponent/FIlterResultStrip';
import useScrollPositon from '../../../helper/useScrollPosition';
import { isAuthenticated } from '../../../Services';
import { SortByArr, defaultFilters } from '../../../CommonModels/CommonCollection';
import { applyFilters, filterChangeDetect, updateSelectedFilter, updateSortFilter } from '../../../Redux/slice/FilterSlice';
import { DefaultFilterModels } from '../../../CommonModels/FilterModel';
import { isMobileView } from '../../../helper/commonHelper';

function AppHeader() {
    const commonStore = useSelector((state) => state.commonStore);
    const inputRef = useRef();

    return (
        <div className={'header-container '} id="app-container">
            <header className={'header-content ' + ((isAuthenticated() && !isMobileView()) ? 'add-left-spacing' : '')} id="app-header" ref={inputRef}>
                <div className='flex-1'>
                    <h1 className='font-bold text-[32px]'>{commonStore?.pageTitle || ''}</h1>
                </div>
            </header>
        </div>
    )
}

export default AppHeader;