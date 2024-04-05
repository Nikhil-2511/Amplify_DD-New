import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

function CustomRadioGroup({selectedValue, options, error, helperText, sx={}, handleChange, radioProps, radioSx={}, ...rest}) {

    function onChange(event) {
        handleChange(event.target.value);
    }

    return (
        <FormControl >
            {
                options?.length > 0 &&
                <RadioGroup 
                    row
                    value={selectedValue}
                    onChange={onChange}
                    {...rest}
                >
                    {
                        options.map((optionList) => {
                            return (
                                <FormControlLabel 
                                    key={optionList.key} 
                                    value={optionList.key} 
                                    control={
                                        <Radio 
                                            {...radioProps}

                                            sx={{
                                                color: '#475467',
                                                '&.Mui-checked': {
                                                    color: '#475467',
                                                },
                                                ...radioSx
                                            }} 
                                        />
                                    } 
                                    label={optionList?.value} 

                                />
                            )
                        })
                    }
                </RadioGroup>
            }
            {
                error && helperText &&
                <div className='text-F04438 text-14 margin-t5 margin-l14 font-400'>{helperText}</div>
            }
        </FormControl>
    )
}

export default CustomRadioGroup;