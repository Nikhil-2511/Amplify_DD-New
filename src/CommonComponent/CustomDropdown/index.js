import React from 'react';
import styled from '@emotion/styled';
import { FormControl, MenuItem, Select } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SelectComp = styled(Select)(() => ({
    '& .MuiSelect-select':{
      '& .MuiSelect-icon': {
        color: '#fff'
      },
      '& .MuiSvgIcon-root': {
        color: '#fff'
      }
    },
    '& .MuiOutlinedInput-root': {
        background: '#121212',
        borderRadius: 8,
      '& fieldset': {
        borderColor: '#353535',
        borderWidth: 0.5,
        background: '#121212',
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
  }))


function CustomDropdown ({value, handleChange, options, placeholder, className}) {
    return (
        <FormControl>
            <SelectComp
                className={'custom-dropdown primary-theme ' + (className || '')}
                value={value}
                onChange={handleChange}
                displayEmpty
                fullWidth={true}
                placeholder={placeholder || 'Test'}
                IconComponent={KeyboardArrowDownIcon}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    options && options.length > 0 &&
                    options.map((optionValue, index) => {
                        return (
                            <MenuItem value={optionValue} key={'select' + index}>Ten</MenuItem>
                        )
                    })
                }
            </SelectComp>
      </FormControl>
    )
}

export default CustomDropdown;