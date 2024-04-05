import { Slider } from '@mui/material';
import React, { useState } from 'react';

function CustomSliderRange({onchange, ...rest}) {
    const [value1, setValue1] = useState([20, 37]);

    const minDistance = 0.5;
    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (activeThumb === 0) {
          setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
          setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
      };

    return (
        <Slider
            className="custom-slider-range-container"
            value={value1}
            onChange={handleChange}
            disableSwap
            steps={0.5}
            {...rest}
        />
    )
}

export default CustomSliderRange;