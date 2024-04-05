import React from 'react';
import styled from '@emotion/styled';
import { Slider } from '@mui/material';

const SuccessSlider = styled(Slider)(({ theme }) => ({
  width: '100%',
  height: 8,
  color: `linear-gradient(130deg, #3247FF 10%, #FFBC9E 80%)`,
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `none`,
    },
    '&.Mui-active': {
      boxShadow: `none`,
    },
  },
  '& .MuiSlider-rail': {
    color: '#383838'
  },
  '& .MuiSlider-track': {
    border: 'none',
    background: `linear-gradient(130deg, #3247FF 10%, #FFBC9E 80%)`
  }
}));

function CustomInputSlider({className, ...rest}) {
  return (
    <div className='custom-input-slider'>
      <SuccessSlider
      {...rest}
        />
    </div>
  )
}

export default CustomInputSlider;