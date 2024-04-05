import React, { useEffect, useLayoutEffect, useState } from 'react';
import BuyerListing from '../../../Component/BuyerComponent/BuyerListing';
import { useDispatch, useSelector } from 'react-redux';
import { showHeaderFilter } from '../../../Redux/slice/FilterSlice';
import { updateAppHeaderState, updateSidebarState } from '../../../Redux/slice/AppNavigationSlice';
import { isMobileView } from '../../../helper/commonHelper';
import { Button } from '@mui/material';
import './style.scss'
import CreateMandateCTA from '../CreateMandateCTA';
import { checkUserRole } from '../../../utils/userRole';

function BrowserScreen() {
    const dispatch = useDispatch();
    const buyerVerificationStore = useSelector((state => state.buyerVerificationStore?.buyerVerificationState))
    useEffect(() => {
        dispatch(updateSidebarState(false));
        dispatch(updateAppHeaderState(false));
    }, [])

    return (
        <div className='browser-screen-container relative'>
            <div>
                <BuyerListing />
                {!isMobileView() && checkUserRole('mandate', buyerVerificationStore?.type) ? <CreateMandateCTA source='browse'/> : null}
            </div>
        </div>
    )
}

export default BrowserScreen;