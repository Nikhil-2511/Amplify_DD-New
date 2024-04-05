
import React from 'react';
import DoneDealFormField from '../../CommonComponent/DoneDealFormField';

function InputFieldWrapper({ fieldLabel, required, ...rest }) {
    return (
        <>
            <div className='flex flex-col justify-start mb-5'>
                <div className='font-[600] mb-2'>{fieldLabel}
                    {required && <span className='error-text ml-1'>*</span>}
                </div>
                <DoneDealFormField className='w-full' {...rest} />
            </div>
        </>
    )
}

export default InputFieldWrapper;