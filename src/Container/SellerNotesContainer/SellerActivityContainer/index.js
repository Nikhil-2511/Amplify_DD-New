import React, { useEffect } from 'react';
import ActivityComponent from '../../../CommonComponent/ActivityComponent';
import { useDispatch } from 'react-redux';
import { updateAppHeaderState } from '../../../Redux/slice/AppNavigationSlice';

function SellerActivityContainer(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateAppHeaderState(true));
    }, [])

    return (
        <ActivityComponent {...props} />
    )
}

export default SellerActivityContainer;