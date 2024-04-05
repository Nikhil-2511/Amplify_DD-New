import { Skeleton } from '@mui/material';
import React from 'react';

function CustomSkeleton({sx, ...rest}) {
    return (
        <Skeleton  
            sx={{ bgcolor: '#070707', ...sx }}
            variant="rectangular"
            {...rest}
        >
        </Skeleton>
    )
}

export default CustomSkeleton;