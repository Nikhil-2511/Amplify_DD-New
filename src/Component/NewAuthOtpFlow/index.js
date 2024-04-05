import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { getFieldLabelData } from '../../helper/commonHelper';
import NewTextField from '../../CommonComponent/NewTextField';
import { trackEvent } from '../../helper/posthogHelper';
import { BUYER_LANDED_LOGIN_PASSWORD_SCREEN } from '../../constants/posthogEvents';

function NewAuthOtpFlow({formData, updateOtp}) {
    useEffect(()=>{
        trackEvent(BUYER_LANDED_LOGIN_PASSWORD_SCREEN);
       },[]);

    return (
        <React.Fragment>
            <div className='text-101828 margin-b15 text-30 font-600'>Check your email</div>
            <div className='text-344054 margin-b20 padding-b15 text-16 324'>Please enter the 6 digit verification code we shared with you on <span className='text-9BA2B3'>{getFieldLabelData(formData, 'email', 'value')}</span></div>
            <div className='onboarding-field-wrapper'>
                <div className='onboarding-field-label'>Passcode<span className='error-text'>*</span></div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => updateOtp(e.target.value, 'otp')}
                    size="small"
                    fullWidth
                    placeholder={getFieldLabelData(formData, 'otp', 'placeholder')}
                    value={getFieldLabelData(formData, 'otp', 'value')} 
                    error={!!getFieldLabelData(formData, 'otp', 'error')}
                    helperText={getFieldLabelData(formData, 'otp', 'error') ? getFieldLabelData(formData, 'otp', 'helperText') : ''}
                />
            </div>
        </React.Fragment>
    )
}

export default NewAuthOtpFlow;