import { FormControl, IconButton, InputAdornment, OutlinedInput, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import { AdvanceFilterSvgWrraper, SearchIconSvg } from '../../../assets/icons';
import { SearchSvg } from '../../../assets/icons/svgIcons';

const theme = createTheme({
    components: {
      // Name of the component
      MuiOutlinedInput: {
        border: 'none',
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            border: 'none'
          },
          input: {
            border: 'none'
          },
          fieldset: {
            border: 'none',
            focused: {
                border: 'none'
            }
          }
        },
      },
    },
  });


function BuyerSearchInput () {

    function handleIconClick() {

    }

    function handleIconMouseDown(e) {
        e.preventDefault();
    }

    return (
        <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="search"
                    type={'text'}
                    size='small'
                    sx = {{background: '#F2F4F7', borderRadius: '8px', width: '100%', maxWidth: '415px', border: 'none'}}
                    startAdornment={
                        <InputAdornment position='start'>
                            {SearchSvg}
                        </InputAdornment>
                    }
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        size='small'
                        aria-label="advance filter"
                        onClick={handleIconClick}
                        onMouseDown={handleIconMouseDown}
                        //   disableRipple={true}
                        edge="end"
                        >
                        {<AdvanceFilterSvgWrraper fontSize="inherit" />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
        </ThemeProvider>
    )
}

export default BuyerSearchInput;