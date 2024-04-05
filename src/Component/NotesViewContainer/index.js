import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteListItem from '../NoteListItem';
import { Box, Button, Modal } from '@mui/material';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { showNoteViewModal } from '../../Redux/slice/CommonSlice';
import { useTheme } from '@emotion/react';

function NotesViewContainer() {
    const noteModelView = useSelector((state) => state.commonStore?.noteModelView);
    const dispatch = useDispatch();
    const theme = useTheme();

    const style = {
        maxWidth: 640,
        width: '100%',
        bgcolor: theme?.palette?.modalStyling?.main || '#121212',
        borderRadius: '10px',
        // border: '1px solid #353535',
        outline: 'none',
        color: theme?.palette?.modalStyling?.contrastText || '#fff',
        p: 4,
    };
    
    useEffect(() => {
        return () => {
            dispatch(showNoteViewModal({}));
        }
    }, [])

    function handleNavigation(id) {
        handleClose();
        window.open(`${noteModelView?.redirectUrl}${id}`, '_blank');
    }

    function handleClose() {
        dispatch(showNoteViewModal({}));
    }

    return (
        <Modal
            open={noteModelView?.isOpen}
            onClose={() => handleClose()}
        >
            <div className='global-modal-container'>
                <Box sx={style}>
                    <NoteListItem noteListItem={noteModelView?.notesData} />
                    <div className='modal-action-container flex col-gap-10 justify-end padding-t20'>
                        <Button className='capitalize' sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={() => handleClose()}>
                            {'Cancel'}
                        </Button>
                        <NewButton className='capitalize' color="secondary" sx={{fontWeight: 500}} variant="contained" onClick={() => handleNavigation(noteModelView?.notesData?.primaryid)}>
                            {'View all notes'}
                        </NewButton>
                    </div>
                </Box>
            </div>
        </Modal>
    )
}

export default NotesViewContainer;