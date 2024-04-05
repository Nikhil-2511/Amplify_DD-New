import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import CircularSuccessIcon from '../assets/images/circularTickIcon.svg';

const compStyle = {
    maxWidth: 500,
    width: '100%',
    bgcolor: '#fff',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    color: '#101828',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    p: 3
  };  


function ModalWrapper(OriginalComponent, title, icon, styles) {
    const incomingStyles = styles || {};
    function newComponent (props) {
        return (
            <Modal
                open={true}
                onClose={props?.handleClose}>
                <div className='global-modal-container'>
                    <Box className='' sx={{...compStyle, ...incomingStyles}}>
                      {title &&  <div className='flex col-gap-15 align-center'>
                            <img className='w-48px' src={icon || CircularSuccessIcon} alt="" />
                            <div className='text-18 font-500'>{title || ''}</div>
                        </div> }
                        <div className={`${title? 'margin-t20':''}`}>
                            <OriginalComponent {...props} />
                        </div>
                    </Box>
                </div>
            </Modal>
        )
    }
    return newComponent;
}

export default ModalWrapper;