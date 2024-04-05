import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

function Loader ({isOpen, hasCustomMessage}) {
  return (
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1001 }}
      open={isOpen}
      onClick={() => {}}
    >
      <div className='text-center'>
        <CircularProgress color="inherit" />
        {
          hasCustomMessage &&
          <div>{hasCustomMessage}</div>
        }
      </div>
    </Backdrop>
  )
}

export default Loader;