import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewCueCard from '../../Component/NewCueCard';
import { updateAppHeaderState, updateSidebarState } from '../../Redux/slice/AppNavigationSlice';

function OpenCuecardView({}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateSidebarState(true));
        dispatch(updateAppHeaderState(true));
        return () => {
            dispatch(updateSidebarState(false));
            dispatch(updateAppHeaderState(false));
        }
    }, [])

    return (
        <div className='margin-t10'>
            <NewCueCard isOpenUrl={true} />
        </div>
    )
}

export default OpenCuecardView;