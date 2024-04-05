import React from 'react';
import { Button } from '@mui/material';

export const NewButton = ({className, label, children, sx={}, ...rest}) => {
    return (
        <Button className={'button ' + (className || '')}
            sx={{ borderRadius: '8px', padding: '1rem', boxShadow: '0px 0px 0px 4px #F2F4F7', ...sx }} 
            {...rest}    
        >
            {children}
        </Button>
    )
}