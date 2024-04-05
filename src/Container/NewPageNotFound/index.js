import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { updateAppHeaderState, updateSidebarState } from '../../Redux/slice/AppNavigationSlice';

function NewPageNotFound({handleNavigation}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateAppHeaderState(true));

        return () => {
            dispatch(updateSidebarState(false));
            dispatch(updateAppHeaderState(false));
        }
    }, [])

    return (
        <div className='page-404-container flex flex-center'>
            <div className='flex-1'>
                <div className='w-80 page-404-image-wrapper padding-l20'>
                    <div className='max-width480'>
                        <h4 className='text-16 font-600 text-363F72'>404 error</h4>
                        <h1 className='margin-b24 margin-t12 text-60 font-600 text-344054'>Page not found</h1>
                        <p className='text-20 text-667085'>The requested URL was not located on our server. Please check the address or return to the dashboard.</p>
                        <NewButton className='capitalize' color="secondary" sx={{ padding: '12px 20px', marginTop: '48px'}} variant='contained' onClick={handleNavigation}>Go to Dashboard</NewButton>
                    </div>
                </div>
            </div>
            {/* <div className='flex-1'>
                <img src={Page404Image} alt="" />
            </div> */}
        </div>
    )
}

export default NewPageNotFound;