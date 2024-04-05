import React from 'react';
import ModalWrapper from '../../../ModalWrapper';
import WarningCircularIcon from '../../../assets/images/warningCircularIcon.svg';
import { NewButton } from '../../../CommonComponent/NewCustomButton';

const styles = {
    maxWidth: 400
}

function MaximumLimitReachedModal({handleClose}) {
    return (
        <div>
            <div className='text-667085 margin-t20 margin-b30'>
            We have shortlisted this company for your future reference. Please conclude the ongoing deals or contact your deal partner.
            </div>
            <div className='modal-action-container'>
                <NewButton className='capitalize' fullWidth sx={{fontWeight: 500}} color="secondary" variant="contained" onClick={handleClose}>
                    Close
                </NewButton>
            </div>
        </div>
    )
}

export default ModalWrapper(MaximumLimitReachedModal, 'Maximum Deal Limit Reached', WarningCircularIcon, styles);