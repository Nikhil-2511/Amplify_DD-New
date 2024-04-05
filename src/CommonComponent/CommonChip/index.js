import React from 'react';
import { CrossIcon } from '../../assets/icons';
import { Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CustomChip({label, disableCross, handleDelete, deleteIconSx={}, ...rest}) {
    return (
        <Chip
            label={label}
            onDelete={handleDelete}
            className='text-12 font-500'
            sx={{background: '#FFFAEB', color: '#B54708'}}
            deleteIcon={disableCross ? <span></span> : <CloseIcon sx={{color: '#F79009', fontSize: 14, ...deleteIconSx}} />}
            {...rest}
        />
    )
}

export default CustomChip;