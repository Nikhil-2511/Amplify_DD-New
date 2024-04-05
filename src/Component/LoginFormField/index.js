import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { getFieldLabelData } from '../../helper/commonHelper';
import NewTextField from '../../CommonComponent/NewTextField';
import { trackEvent } from '../../helper/posthogHelper';
import { BUYER_LANDED_LOGIN_SCREEN } from '../../constants/posthogEvents';


function LoginFormField({formData, updateFormData}) {
    useEffect(()=>{
     trackEvent(BUYER_LANDED_LOGIN_SCREEN);
    },[]);
    
    return (
        <div className='login-form-field-container'>
            <div className='text-101828 margin-b15 text-36 font-600'>Welcome Back</div>
            <div className='text-344054 margin-b20 padding-b15 text-18'>Continue your journey with Done Deal by logging into your account.</div>

            <div className='onboarding-field-wrapper'>
                <div className='onboarding-field-label'>Official Email ID<span className='error-text'>*</span></div>
                <NewTextField
                    className="rounded-8 "
                    onChange={(e) => updateFormData(e.target.value, 'email')}
                    size="small"
                    fullWidth
                    autoComplete='off'
                    placeholder={getFieldLabelData(formData, 'email', 'placeholder')}
                    value={getFieldLabelData(formData, 'email', 'value')} 
                    error={!!getFieldLabelData(formData, 'email', 'error')}
                    helperText={getFieldLabelData(formData, 'email', 'error') ? getFieldLabelData(formData, 'email', 'helperText') : ''}
                />
                <div className='text-667085 text-14 margin-t8'>A passcode will be sent to this email for verification.</div>
            </div>
        </div>
    )
}

export default LoginFormField;