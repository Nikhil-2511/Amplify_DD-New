import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React from 'react';
import './style.scss';

const CustomField = styled(({fieldsetBgColor, backgroundColor, borderRadius , ...other}) => <TextField {...other}/>)((props) => {
  return {
  input: {
    color: '#B5B5B5',
    zIndex: 1,
    fontSize: 20,
    background: props?.backgroundColor ? props.backgroundColor : '',
    borderRadius: props?.borderRadius ? props.borderRadius : 8,
    '&.Mui-disabled': {
      WebkitTextFillColor: '#B5B5B5'
    }
  },
  textarea: {
    color: '#B5B5B5',                                                                  // color/typographycolor: B5B5B5
    zIndex: 1,                                                                         // background: 121212
    fontSize: 20,                                                                      // border color: 353535
    '&.Mui-disabled': {                                                                // border-width: 0.5 
      WebkitTextFillColor: '#B5B5B5'                                                   // focused border color: D6D6D6                                                 
    }                                                                                  // focused input/textarea/MuiTypography color: fff
  },
  '& .MuiOutlinedInput-root': {                                                        // error borderColor: FF8970
      background: props?.fieldsetBgColor ? props.fieldsetBgColor : '#121212',                                                           // disabled border color
      borderRadius: 8,
    '& fieldset': {
      borderColor: '#353535',
      borderWidth: 0.5,
      background: props?.fieldsetBgColor ? props.fieldsetBgColor : '#121212',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D6D6D6',
      borderWidth: 0.5,
    },
    '&.Mui-focused input': {
      color: '#fff'
    },
    '&.Mui-focused textarea': {
      color: '#fff'
    },
    '&:hover fieldset': {
      borderColor: '#D6D6D6',
      borderWidth: 0.5
    },
    '&.Mui-error fieldset': {
      // color: '#FF8970'
      borderColor: '#FF8970'
    },
    '& .MuiTypography-root': {
      color: '#B5B5B5',
      paddingRight: 12,
      borderRight: '1px solid #353535',
      fontSize: 20,
      zIndex: 2
    },
    '&.Mui-focused .MuiTypography-root': {
      color: '#fff',
    },
    '&.Mui-disabled fieldset': {
      borderColor: '#353535'
    }
  },
}});

function CustomTextArea({...rest}) {
  return (
    <CustomField autoComplete='off' {...rest} />
  )
}

export default CustomTextArea;