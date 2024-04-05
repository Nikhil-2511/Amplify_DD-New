import styled from '@emotion/styled';
import { Radio } from '@mui/material';
import React from 'react';

const RadioWithWhiteCheck = styled(Radio)({
  root: {
    color: '#fff',
      "&.checked": {
        color: '#fff'
      }
  },
  checked: {}
});

// sx={{color: '#fff', '&.Mui-checked': {color: '#fff'}}}

function CustomRadio ({className, ...rest}) {
  return (
    <RadioWithWhiteCheck className={'radio-container ' + (className ? className : '')} {...rest} />
  )
}

export default CustomRadio;