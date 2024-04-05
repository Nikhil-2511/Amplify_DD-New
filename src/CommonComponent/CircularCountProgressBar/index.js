import { circularProgressClasses } from '@mui/material';
import React from 'react';
import CircularProgressWithLabel from '../CircularProgressBarWithLabel';
import { useSelector } from 'react-redux';

function CircularCountProgressBar({currentCount = 0, totalCount = 0, size=60, thickness = 4, ...rest}) {
    function calculateProgressValue() {
        if(currentCount > totalCount) return 100;
        if(currentCount > 0 && totalCount > 0) return Math.round((100 * currentCount) / totalCount);
        return 0;
    }

    return (
        <CircularProgressWithLabel 
            value={calculateProgressValue()} 
            label={`${currentCount}/${totalCount}`}
            thickness={thickness} 
            size= {size}
            sx={{color: '#3247FF', 
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                },
            }}
            {...rest}
        />
    )
}

export default CircularCountProgressBar