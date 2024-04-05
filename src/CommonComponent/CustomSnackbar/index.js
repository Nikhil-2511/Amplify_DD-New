import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSnackbar } from '../../Redux/slice/CommonSlice';

function CustomSnackbar() {
    const snackbarState = useSelector((state) => state.commonStore?.snackbarState);
    const dispatch = useDispatch();

    function handleClose() {
        dispatch(updateSnackbar({}));
    }

    function snackbarStyling() {
        switch(snackbarState?.type) {
            case 'error': return {color: '#D92C1F', border: '1px solid #FDA29B', borderRadius: '8px', background: '#FFFBFA'}
            default: return {color: '#027A46', border: '1px solid #6CE9A6', borderRadius: '8px', background: '#F6FEF9'}
        }
    }

    return (
        <Snackbar
        anchorOrigin={snackbarState?.anchorOrigin || { vertical: 'top', horizontal: 'center' }}
        open={snackbarState.isOpen}
        onClose={handleClose}
        // sx={{...snackbarStyling()}}
        autoHideDuration={snackbarState.duration || 3000}
        key={'CustomSnackbar'}
      >
        <Alert sx={{ width: '100%', fontWeight: 500, ...snackbarStyling()}} severity={snackbarState?.type || 'success'}>
            {snackbarState.message}
        </Alert>
      </Snackbar>
    )
}

export default CustomSnackbar;