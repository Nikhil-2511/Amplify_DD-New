import React, { useEffect, useState } from 'react';
import './style.scss';
import { WarningIcon } from '../../assets/icons/svgIcons';
import { APPROVE, PUT, REJECT } from '../../constants';
import ApproveActionModal from '../../CommonComponent/ApproveActionModal';
import SuccessIcon from '../../assets/images/circularTickIcon.svg';
import WarningCircularIcon from '../../assets/images/warningCircularIcon.svg';
import { RejectModel, confirmPopUpModel } from '../../Container/AdminContainer/BuyerProfile/ProfileTabModel';
import { ENDPOINT } from '../../config/endpoint';
import { CORPORATE_VC_KEY, VC_PE_KEY } from '../../constants/keyVariableConstants';
import { APPROVED_BUYER_RECOMMENDED_MESSAGE } from '../../constants/MessageConstants';
import { globalAlert, updateActionState } from '../../Redux/slice/CommonSlice';
import { useDispatch } from 'react-redux';

function ApproveActionContainer({uid, handleRefresh, formData}) {
    const dispatch = useDispatch();

    function handleAction(state) {
        dispatch(updateActionState({state: state, uid, formData}));
    }

    return (
        <div className='approve-action-container flex col-gap-20 bg-white box-shadow-type1'>
            <div className='max-w64px w-full h-64px flex flex-center bg-warning rounded-8'>
                {WarningIcon}
            </div>
            <div>
                <h6 className="font-600 text-16 text-101828 margin-0 ">Approval Pending</h6>
                <p className='text-475467 text-12'>The buyer's dashboard functionality will be enabled once you've reviewed and approved their account</p>
                <div className='cursor-pointer font-500 text-warning inline-block margin-r10' onClick={() => handleAction(APPROVE)}>Approve</div>
                <div className='cursor-pointer font-500 text-667085 inline-block' onClick={() => handleAction(REJECT)}>Reject</div>
            </div>
        </div>
    )
}

export default ApproveActionContainer;