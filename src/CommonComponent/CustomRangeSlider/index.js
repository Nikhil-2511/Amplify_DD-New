import styled from '@emotion/styled';
import { Slider } from '@mui/material';
import React from 'react';

const RangeSlider = styled(Slider)(({ theme }) => ({
    width: '100%',
    height: 8,
    color: `#EAECF0`,
    '& .MuiSlider-thumb': {
      backgroundColor: '#fff',
      height: 24,
      width: 24,
      border: '1px solid #7F56D9',
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `none`,
      },
      '&.Mui-active': {
        boxShadow: `none`,
      },
    },
    '& .MuiSlider-rail': {
      color: '#EAECF0'
    },
    '& .MuiSlider-track': {
      border: 'none',
      background: `#7F56D9`
    }
  }));


function CustomRangeSlider({className, rangeSliderValue=[0, 50], onChange, minDistance = 0.5, ...rest}) {
    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (activeThumb === 0) {
            onChange([Math.min(newValue[0], rangeSliderValue[1] - minDistance), rangeSliderValue[1]]);
        } else {
            onChange([rangeSliderValue[0], Math.max(newValue[1], rangeSliderValue[0] + minDistance)]);
        }
      };

    return (
        <RangeSlider
            className={"" || className}
            value={rangeSliderValue}
            onChange={handleChange}
            {...rest}
        />
    )
}

export default CustomRangeSlider;