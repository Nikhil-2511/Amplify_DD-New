import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';


function CircularProgressWithLabel({value, color, sx={}, label, typographyColor='#3247FF', fontSize=14, ...rest}) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
            variant="determinate"
            sx={{
                color: '#F9F5FF',
            }}
            value={100}
            {...rest}
        />
        <CircularProgress 
            sx={{position: 'absolute', left: 0, ...sx}}
            variant="determinate" color={color} 
            value={value} {...rest} 
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" sx={{color: typographyColor, fontSize: `${fontSize}px`}}>
            {label}
          </Typography>
        </Box>
      </Box>
    );
  }

  export default CircularProgressWithLabel;