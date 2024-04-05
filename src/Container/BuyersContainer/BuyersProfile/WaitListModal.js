import React from 'react';
import ModalWrapper from '../../../ModalWrapper';
import SuccessIcon from '../../../assets/images/circularTickIcon.svg';
import { NewButton } from '../../../CommonComponent/NewCustomButton';

const styles = {
    maxWidth: 400
}

function WaitlistModal({handleClose}) {
    return (
        <div>
            <div>
                Thank you for your interest in Done Deal. We will notify you once we expand our services to include you.
            </div>
            <div className='text-white margin-t30'>
                <NewButton className='capitalize' fullWidth color="secondary" sx={{fontWeight: 500, width: '100%'}} variant="contained" onClick={() => handleClose()}>
                    Okay
                </NewButton>
            </div>
        </div>
    )
}

export default ModalWrapper(WaitlistModal, 'Added to Waitlist', SuccessIcon, styles)