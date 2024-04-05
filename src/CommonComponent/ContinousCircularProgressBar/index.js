import { Box, CircularProgress } from '@mui/material';
import React from 'react';


function ContinousCircularProgressBar({value, color, sx={}, label, ...rest}) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
            sx={{
                color: '#F9F5FF',
            }}
            value={100}
            {...rest}
        />
        <CircularProgress 
            sx={{position: 'absolute', left: 0, ...sx}}
            color={color} 
            value={value} {...rest} 
        />
      </Box>
    );
  }

  export default ContinousCircularProgressBar;