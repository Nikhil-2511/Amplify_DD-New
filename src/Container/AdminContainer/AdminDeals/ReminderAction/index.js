import React, { useState } from 'react';
import NoteListItem from '../../../../Component/NoteListItem';
import { Box, Button, Chip, Modal } from '@mui/material';
import { useTheme } from '@emotion/react';

function ReminderAction({actionData, handleRefresh}) {
    const [showActionModal, setShowActionModal] = useState(false);
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
    
    function handleShowModal() {
        setShowActionModal(true);
    }

    return (
        <div>
            <div className='flex'>
                <div className='text-027A48 padding-y4 font-500 text-center padding-x8 bg-ECFDF3 rounded-16 cursor-pointer text-12' onClick={() => handleShowModal()}>View</div>
            </div>
            {
                showActionModal &&
                <Modal
                    open={showActionModal}
                    onClose={() => setShowActionModal(false)}
                >
                    <div className='global-modal-container'>
                        <Box sx={style}>
                            <NoteListItem noteListItem={actionData} handleRefresh={handleRefresh} />
                            <div className='modal-action-container flex col-gap-10 justify-end padding-t20'>
                                <Button className='capitalize' sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={() => setShowActionModal(false)}>
                                    {'Cancel'}
                                </Button>
                            </div>
                        </Box>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ReminderAction;