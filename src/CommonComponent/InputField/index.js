import React from 'react';
import { FormControl, Input, TextField } from '@mui/material';

import './style.scss';
import {styled} from '@mui/material/styles';

const CssTextField = styled(TextField)({
  root: {
    '& .MuiOutlinedInput-input': {
      color: '#fff',
    },
  },
});

function InputField({className, formControl,  ...rest}) {
  return (
    <FormControl {...formControl} sx={{color: '#fff'}}>
      <CssTextField sx={{color: '#fff', border: '1px solid #fff'}} className={'input-field-container ' + (className ? className : '')} {...rest}/>
    </FormControl>
  )
}

export default InputField;