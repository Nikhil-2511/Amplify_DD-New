import React, { useEffect } from 'react';
import ModalWrapper from '../../../ModalWrapper';
import WarningCircularIcon from '../../../assets/images/warningCircularIcon.svg';
import { Button } from '@mui/material';
import { trackEvent } from '../../../helper/posthogHelper';
import { BUYER_LANDED_ONBOARDING_VERIFICATION_PENDING } from '../../../constants/posthogEvents';


const styles = {
    maxWidth: 400
}

export function AccountVerificationModal({handleClose, headerText, body, event='', icon}) {
    useEffect(()=>{
        event && trackEvent(event);
    },[]);

    return (
        <div>
             <div className='flex col-gap-15 align-center'>
                <img className='w-48px' src={icon} alt="" />
                 <div className='text-18 font-500'>{headerText || ''}</div>
             </div>
            <div className='mt-3'>
                {body}
            </div>
            <div className='text-white margin-t30 flex align-center col-gap-8'>
                <Button className='capitalize flex-1' sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={() => handleClose()}>
                    {'Discard'}
                </Button>
                <a className='block bg-1D2939 text-white flex-1 text-center font-500 text-16 padding-12 rounded-8' href="https://zcal.co/aneesh-donedeal/introduction" rel="noreferrer" target='_blank'>
                    Book a call
                </a>
            </div>
        </div>
    )
}

export default ModalWrapper(AccountVerificationModal,'', WarningCircularIcon, styles)