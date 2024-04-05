import React, { useState } from 'react';
import { Stack, useTheme } from '@mui/material';
import { APPROVE,  REJECT } from '../../constants';
import './style.scss';
import SellerDealsActionModal from './SellerDealActionModal';
import { isMobileView } from '../../helper/commonHelper';
import { GenericButton, OutlineButton } from '../../CommonComponent/CustomButton';

function SellerDealsAction({actionData, handleRefresh}) {
    const [approvalState, setApprovalState] = useState('');
    const isMobile  = isMobileView();

    function handleClose() {
        setApprovalState('');
    }

    return (
        <React.Fragment>
            {
                isMobile ? 
                <Stack direction={'row'} columnGap={2.5} justifyContent={'flex-end'} >
                    <OutlineButton className="text-30 capitalize" size="small" onClick={() => setApprovalState(REJECT)} sx={{fontWeight: 400, padding: '11px 34px', height: '37px'}}>Reject</OutlineButton>
                    <GenericButton className="capitalize" color='modalButton' size="small" variant="contained" onClick={() => setApprovalState(APPROVE)} sx={{fontWeight: 400, padding: '11px 34px', height: '37px'}}>Accept</GenericButton>
                </Stack>
                :
                <Stack direction={'row'} columnGap={2.5} >
                    <div className="padding-x20 padding-y4 active-block text-white cursor-pointer" onClick={() => setApprovalState(APPROVE)} > Accept</div>
                    <div className="padding-x20 padding-y4 passive-block text-white  cursor-pointer" onClick={() => setApprovalState(REJECT)}>Reject</div>
                </Stack>
            }
            {
                approvalState &&
                <SellerDealsActionModal approvalState={approvalState} actionData={actionData} handleRefresh={handleRefresh} handleClose={handleClose} />
            }
        </React.Fragment>
    )
}

export default SellerDealsAction;