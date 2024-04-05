import { FormControl } from '@mui/material';
import React from 'react';

function MultiSelectColWrap(props) {
  return (
    <FormControl sx={{ mx: '10px' }} component="fieldset" variant="standard" fullWidth={true}>
      <div className='flex flex-wrap col-gap-10 row-gap-15'>
        {props.children}
      </div>
    </FormControl>
  )
}

export default MultiSelectColWrap;