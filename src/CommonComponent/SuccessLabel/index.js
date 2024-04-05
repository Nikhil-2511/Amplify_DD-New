import React from 'react';
import { Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function SuccessLabel({label, icon, ...rest}) {
    return (
        <Chip label={label} icon={icon || <CheckCircleOutlineIcon fontSize='10px' sx={{verticalAlign: 'middle', color: 'inherit'}} />} {...rest}/>
    )
}

export default SuccessLabel;