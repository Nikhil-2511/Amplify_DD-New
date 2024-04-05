import { Autocomplete, Paper } from '@mui/material';
import React from 'react';
import NewTextField from '../../CommonComponent/NewTextField';

const CustomPaper = (props) => {
    return <Paper placement="bottom-start" popperOptions={{placement: 'bottom'}} {...props} sx={{ background: '#fff', color: '#121212', "& .MuiAutocomplete-listbox": {
        "& .MuiAutocomplete-option": {
            borderBottom: '1px solid #D0D5DD'
        },
        "& .MuiAutocomplete-option:hover": {
            background: '#fff'
        },
      } }} />;
};

function NewCustomAutoSuggest({value='', error, onChange, isEditable, textboxStyles, placeholder, id, handleInputChange,  ...rest}) {
    function handleOnChange(newValue) {
        onChange(newValue);
    }

    return (
        <Autocomplete
            id={id}
            disableClearable
            PaperComponent={CustomPaper}
            PopperComponent={CustomPaper}
            {...rest}
            value={value}
            onChange={(event, newValue) => {
                handleOnChange(newValue);
            }}
            renderInput={(params) => <NewTextField placeholder={placeholder} error={error}  {...params} />}
        />
    )
}

export default NewCustomAutoSuggest;