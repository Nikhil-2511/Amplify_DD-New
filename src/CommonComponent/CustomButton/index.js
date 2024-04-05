import { Button } from '@mui/material';
import React from 'react';
import './style.scss';

export const gradientType1Button = ({className, label, ...rest}) => {
    return (
        <Button 
            className='button outline capitalize ' 
            sx={{ borderRadius: '8px' }} 
            variant="outlined" 
            {...rest}
        >
            {label}
        </Button>
    )
}

export const gradientType2Button = ({}) => {
    return (
        <Button 
            className="grad-2 auth-action-cta button primary capitalize"  
            sx={{borderRadius: '8px'}} fullWidth={true} variant="contained" >

        </Button>
    )
}

export const OutlineButton = ({className, children, sx={}, ...rest}) => {
    return (
        <Button
            className={'button outline ' + (className || '')}
            sx={{ borderRadius: '8px', ...sx }}
            variant="outlined"
            {...rest}
        >
            {children}
        </Button>
    )
}

export const BooleanButton = ({className, children, selected, ...rest}) => {
    return (
        <Button
            className={'btn-cnt boolean-button ' + (className || '') + (selected ? ' selected ' : '')}
            {...rest}
        >
            {children}
        </Button>
    )
}

export const GenericButton = ({className, children, sx={}, ...rest}) => {
    return (
        <Button className={'button ' + (className || '')}
            sx={{ borderRadius: '8px', ...sx }} 
            {...rest}    
        >
            {children}
        </Button>
    )
}