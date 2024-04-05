import { Autocomplete, Paper } from '@mui/material';
import React from 'react';
import CustomTextArea from '../../CommonComponent/TextArea';

const CustomPaper = (props) => {
    return <Paper placement="bottom-start" popperOptions={{placement: 'bottom'}} {...props} sx={{ background: '#121212', color: '#fff', "& .MuiAutocomplete-listbox": {
        "& .MuiAutocomplete-option": {
            borderBottom: '1px solid #353535'
        },
        "& .MuiAutocomplete-option:hover": {
            background: 'rgba(0,0,0, 0.3)'
        },
        // Will require in future
        // "& .MuiAutocomplete-option[aria-selected='true']": {
        //   bgcolor: "purple",
        //   "&.Mui-focused": {
        //     bgcolor: "purple",
        //   }
        // }
      } }} />;
};

/**
 * 
 * @param {id} important for auto fill issue 
 * @returns 
 */

function CustomAutoComplete({value='', error, onChange, isEditable , options=[], textboxStyles, placeholder, id,  ...rest}) {

    function handleOnChange(newValue) {
        if(!isEditable) return;
        onChange(newValue);
    }

    return (
        <Autocomplete
            options={options.map((option) => option.optionValue)}
            id={id}
            disableClearable
            freeSolo
            PaperComponent={CustomPaper}
            PopperComponent={CustomPaper}
            {...rest}
            value={value}
            onChange={(event, newValue) => {
                handleOnChange(newValue);
            }}
            renderInput={(params) => <CustomTextArea placeholder={placeholder} onChange={(e) => handleOnChange(e.target.value)} error={error}  {...params} />}
        />
    )
}

export default CustomAutoComplete;