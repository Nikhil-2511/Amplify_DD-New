import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularSuccessIcon from '../../../assets/images/circularTickIcon.svg';
import WarningCircularIcon from '../../../assets/images/warningCircularIcon.svg';
import { NewButton } from '../../NewCustomButton';
import ApproveActionModal from '../../ApproveActionModal';
import { POST, PUT, REJECT, APPROVE} from '../../../constants';
import { ENDPOINT } from '../../../config/endpoint';
import { SellerELAcceptReasonModel, SellerELRejectReasonModel } from '../../../Container/AdminContainer/AdminSeller/ActionModals/DataModel';
import { useSelector } from 'react-redux';

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



function BuyerCommonModal({children, title, type, styles, onClose, onSuccess, hideCancelAction, confirmLabel, cancelLabel, hideAction, hideIcon, handleSaveAction, actionCtaFullWidth, actionData, btnStyle=''}) {
    const incomingStyles = styles || {};
    const [approvalModal, setApprovalModal] = useState('');
    const [approvalState, setApprovalState] = useState('');
    const showElDetails = useSelector((state) => state.commonStore.showElDetails);
    function handleClose() {
        setApprovalState('');
    }

    function handleApprovalAction() { 
        setApprovalState('');
        onClose();
        if(showElDetails?.handleRefresh) showElDetails.handleRefresh();
    }
    
    return (
        <Modal
            open={true}
            onClose={onClose}>
            <div className='global-modal-container'>
                <Box className='' sx={{...compStyle, ...incomingStyles}}>
                    <div className='flex col-gap-15 align-center'>
                        {
                            !hideIcon &&
                            <img className='w-48px' src={type !== 'error' ? CircularSuccessIcon : WarningCircularIcon} alt="" />
                        }
                        <div className='text-18 font-500'>{title || ''}</div>
                    </div>
                   {children}
                   {
                    !hideAction &&
                    <div className='modal-action-container flex col-gap-10 justify-end padding-t20'>
                        {
                            !hideCancelAction &&
                            <div className='flex col-gap-10'>
                                <Button className='text-344054 capitalize'  variant="outline" sx={{border: '1px solid #D0D5DD', color: '#344054'}} onClick={onClose}>Close</Button>
                                {
                                    showElDetails?.type === 'seller' &&
                                    <div className='flex col-gap-10'>
                                    <NewButton className='text-white capitalize' fullWidth variant="contained" color='secondary' sx={{background: '#027A48', color: '#FFF', '&:hover': {background: '#027A48', color: '#FFF'}}} onClick={() => setApprovalState(APPROVE)} >Approve EL</NewButton>
                                    </div>
                                }
                                {
                                    showElDetails?.type === 'seller' &&
                                    <div className='flex col-gap-10'>
                                    <NewButton className='text-white capitalize' fullWidth variant="contained" color='secondary' sx={{background: '#D92D20', color: '#FFF', '&:hover': {background: '#D92D20', color: '#FFF'}}} onClick={() => setApprovalState(REJECT)}>Request Re-sign</NewButton>
                                    </div>
                                }
                            </div>
                        }
                        {
                            !handleSaveAction && showElDetails?.type !== 'seller' &&
                            <NewButton className={`capitalize ${btnStyle}`} fullWidth={actionCtaFullWidth} color="secondary" variant="contained" sx={{fontWeight: 500}} onClick={onSuccess}>
                                {confirmLabel || 'Save & Close'}
                            </NewButton>
                        }
                        { approvalState === APPROVE &&
                            <ApproveActionModal 
                                isopen={true} 
                                title="Are you sure you want to accept the Seller’s EL?"
                                handleOnClose={() =>setApprovalState('')} 
                                icon={CircularSuccessIcon} 
                                data={SellerELAcceptReasonModel}
                                apiMethod={POST}
                                handleSuccess={handleApprovalAction}
                                customObj={{'uid': showElDetails?.uid, 'type': showElDetails?.type, 'state': 'signed'}}
                                apiUrl={ENDPOINT.SELLERLISTING.verifyReSignElApi()}
                            />
                        }
                        { approvalState === REJECT &&
                            <ApproveActionModal 
                                isopen={true} 
                                title="Are you sure you want to ask the seller to re-sign the EL?" 
                                handleOnClose={() =>setApprovalState('')} 
                                icon={WarningCircularIcon} 
                                data={SellerELRejectReasonModel}
                                apiMethod={POST}
                                handleSuccess={handleApprovalAction}
                                customObj={{'uid': showElDetails?.uid, 'type': showElDetails?.type, 'state': 'resign'}}
                                apiUrl={ENDPOINT.SELLERLISTING.verifyReSignElApi()}
                            />
                        }
                    </div>
                   }
                   {
                    showElDetails.state === 'yes' && <div className='margin-t30 flex flex-direction-coloum row-gap-32'>
                       <span style={{color:'#027A48', fontWeight:'500', fontSize: '20px'}}>EL Signature Approved </span> 
                       <div className='flex justify-end'>
                            <Button className='text-344054 capitalize flex col-gap-10 justify-end'  variant="outline" sx={{border: '1px solid #D0D5DD', color: '#344054'}} onClick={onClose}>Close</Button>
                       </div>
                       
                    </div>
                   }
                   {
                    showElDetails.state === 'resign' && <div className='margin-t30 flex flex-direction-coloum row-gap-32'>
                        <span style={{color:'#D92D20', fontWeight:'500', fontSize: '20px'}}>EL Re-sign Requested</span>
                        <div className='flex justify-end'>
                                <Button className='text-344054 capitalize flex col-gap-10 justify-end'  variant="outline" sx={{border: '1px solid #D0D5DD', color: '#344054'}} onClick={onClose}>Close</Button>
                        </div>
                       
                    </div>
                   }
                   { showElDetails?.showCancelBtn &&
                        <div className='flex justify-end'>
                                <Button className='text-344054 capitalize flex col-gap-10 justify-end'  variant="outline" sx={{border: '1px solid #D0D5DD', color: '#344054'}} onClick={onClose}>Close</Button>
                        </div>
                   }
                </Box>
            </div>
        </Modal>
    )
}

export default BuyerCommonModal;