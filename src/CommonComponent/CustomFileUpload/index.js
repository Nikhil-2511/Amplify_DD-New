import React, { useState } from 'react';
import './style.scss';

/**
 * 
 * id is important to select file
 */

function CustomFileUpload({id, children, accept, className, handleOnChange, disabled, reset, labelClassName=''}) {
    let randomString = Math.random().toString(36);
    const [inputKey, setInputKey] = useState(randomString);

    function handleChange(files) {
        handleOnChange(files);
    }

    return (
        <div className={"custom-file-upload " + (className || '')} >
            <label htmlFor={id} className={'custom-upload-label ' + (labelClassName)}>
                {children}
            </label>
            <input  disabled={disabled} id={id} type="file" input-type="file" accept={accept || '*'} onChange={handleChange}/>
        </div>
    )   
}

export default CustomFileUpload;