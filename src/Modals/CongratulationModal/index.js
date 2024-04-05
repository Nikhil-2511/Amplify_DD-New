import { Button, Modal } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
// import DoneDealIcon from '../assets/images/Vector.png';
import DoneDealIcon from '../assets/images/DoneDealLogo.svg';
import { updateCongratulationModal } from '../../Redux/slice/CommonSlice';

export function CongratulationModal() {
    const commonStore = useSelector((state) => state.commonStore);
    const dispatch = useDispatch();

    function handleClick() {
        commonStore?.congratulationModal?.action();
    }

    function handleClose () {
        dispatch(updateCongratulationModal({}));
    }

    return (
        <Modal
          open={commonStore?.congratulationModal?.isOpen}
          sx={{ zIndex: 100001 }}
          disableAutoFocus={true}
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
          onClose={handleClose}>
            <div className='congratulation-modal-container'>
                <div className='congratulation-modal-content'>
                    <div className='congratulation-mask'></div>
                    <div className='text-center'>
                        {/* <img className='congratulations-icon' src={DoneDealIcon} alt="" /> */}
                        <img className='congratulations-icon' src={DoneDealIcon} alt="" />
                        {/* {DoneDealIcon} */}
                    </div>
                    <h1 className='congratulation-title'>{commonStore?.congratulationModal?.title}</h1>
                    <p className='desc-text'>{commonStore?.congratulationModal?.description}</p>
                    {
                        commonStore?.congratulationModal?.actionCta &&
                        <div className='auth-action-cta-container congratulation-action-container width100 margin-t20'><Button className='grad-2 auth-action-cta text-unset' fullWidth={true} sx={{ borderRadius: '8px' }} variant="contained" onClick={handleClick}>{commonStore?.congratulationModal?.actionLabel}</Button></div>
                    }
                </div>
            </div>
        </Modal>
    )
}