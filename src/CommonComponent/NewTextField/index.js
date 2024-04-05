import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import React from 'react';

/** 
 * @params {color, fontSize, fontWeight, padding, lineHeight, borderRadius, borderColor, disabledColor, backgroundColor, errorColor, typographyColor, typographySize} 
 * 
 */
const CustomField = styled(({fieldsetBgColor, backgroundColor, borderRadius, color, fontSize, fontWeight, padding, lineHeight, borderColor, disabledColor, errorColor, typographyColor, typographySize, ...other}) => <TextField {...other}/>)((props) => (
  
  {
  input: {
    color: props?.color || '#101828',
    zIndex: 1,
    fontSize: props?.fontSize || '1rem',
    fontWeight: props?.fontWeight || 400,
    padding: props?.padding || '10px 14px',
    lineHeight: props?.lineHeight || '1.5rem',
    // background: props?.backgroundColor ? props.backgroundColor : '#fff',
    borderRadius: props?.borderRadius ? props.borderRadius : 8,
    '&.Mui-disabled': {
      WebkitTextFillColor: props?.disabledColor || '#667085'
    }
  },
  textarea: {
    color: props?.color || '#101828',
    zIndex: 1,
    fontSize: props?.fontSize || '1rem',
    fontWeight: props?.fontWeight || 400,
    padding: props?.padding || '10px 14px',
    lineHeight: props?.lineHeight || '1.5rem',
    '&.Mui-disabled': {
      WebkitTextFillColor: props?.disabledColor || '#667085'
    }
  },
  '& .MuiOutlinedInput-root': {
      background: props?.backgroundColor || '#fff',
      // borderRadius: props?.borderRadius || 8,
      borderColor: props?.borderColor || '#D0D5DD',
      padding: 0,
    '& fieldset': {
      borderColor: props?.borderColor || '#D0D5DD',
      borderWidth: 1,
      borderRadius: props?.borderRadius || 8,
      background: props?.backgroundColor || '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: props?.borderColor || '#D0D5DD',
      borderWidth: 1,
    },
    '&.Mui-focused input': {
      color: props?.color || '#101828'
    },
    '&.Mui-focused textarea': {
      color: props?.color || '#101828'
    },
    '&:hover fieldset': {
      borderColor: props?.borderColor || '#D0D5DD',
      borderWidth: 1
    },
    '&.Mui-error fieldset': {
      // color: '#FF8970'
      borderColor: props?.errorColor || '#FF8970'
    },
    '& .MuiTypography-root': {
      color: props?.typographyColor || '#667085',
      paddingRight: 12,
      paddingLeft: 12,
      borderRight: `1px solid ${props?.borderColor || '#D0D5DD'}`,
      fontSize: props?.typographySize || 16,
      zIndex: 2
    },
  },
  }));

function NewTextField({className, ...rest}) {
    return <CustomField autoComplete='off' {...rest} />
}

export default NewTextField;