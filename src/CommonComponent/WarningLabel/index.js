import { Chip } from '@mui/material';
import React from 'react';

function WarningLabel({label, icon, ...rest}) {
    return (
        <Chip label={label} icon={icon || ''} {...rest}/>
    )
}

export default WarningLabel;