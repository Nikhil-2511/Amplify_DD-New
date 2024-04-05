import React from 'react';
import ModalWrapper from '../../../ModalWrapper';
import WarningCircularIcon from '../../../assets/images/warningCircularIcon.svg';
import { Button } from '@mui/material';
import { NewButton } from '../../../CommonComponent/NewCustomButton';

const styles = {
    maxWidth: 400
}

function ConfirmExpressModal({handleClose, handleSendInterest}) {
    return (
        <div className=''>
            <div className='text-667085 margin-t20 margin-b30'>This will be your last free deal. Contact your Deal Partner for increasing your limit.</div>
            <div className='modal-action-container flex col-gap-10 justify-end'>
                <Button className='capitalize' fullWidth sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={handleClose}>
                    Discard
                </Button>
                <NewButton className='capitalize' fullWidth sx={{fontWeight: 500}} color="secondary" variant="contained" onClick={handleSendInterest}>
                    Send Interest
                </NewButton>
            </div>
        </div>
    )
}


export default ModalWrapper(ConfirmExpressModal, 'Confirm Express Interest?', WarningCircularIcon, styles);