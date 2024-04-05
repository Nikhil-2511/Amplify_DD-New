import React, { useEffect, useState } from 'react';
import GreenTickIcon from '../../../../assets/images/greenTickIcon.svg';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ApproveActionModal from '../../../../CommonComponent/ApproveActionModal';
import { APPROVE, PUT, REJECT } from '../../../../constants';
import { ENDPOINT } from '../../../../config/endpoint';
import { SellerApprovalModel, SellerRejectModel } from './DataModel';
import SuccessIcon from '../../../../assets/images/circularTickIcon.svg';
import WarningCircularIcon from '../../../../assets/images/warningCircularIcon.svg';
import { CuecardModel } from '../../../../Component/EditCuecardModal/editCueCardModel';
import EditCueCardContainer from '../../../EditCueCardContainer';

function ActionModals({actionData, handleRefresh}) {
    const [cueCardModal, setCueCardModal] = useState(false);
    const [approvalModal, setApprovalModal] = useState('');
    const [dataModel, setDataModel] = useState({});

    useEffect(() => {
        if(Object.keys(actionData)?.length) {
            updateModelData(approvalModal);
        }
    }, [approvalModal])

    function updateModelData(actionState) {
        if(actionState) {
            if(actionState === APPROVE) {
                let currentDataModel = SellerApprovalModel();
                let newDataModel = {};
                Object.keys(currentDataModel).forEach((keyName) => {
                    if(actionData[keyName]) {
                        newDataModel[keyName] = {
                            ...currentDataModel[keyName],
                            value: actionData[keyName]
                        }
                    }
                    else {
                        newDataModel[keyName] = {
                            ...currentDataModel[keyName],
                        }
                    }
                })
                setDataModel(newDataModel);
            }
            else {
                setDataModel({});
            }
        }
        else {
            setDataModel({});
        }
    }

    function handleSuccess() {
        setCueCardModal(false);
        setApprovalModal(APPROVE);
    }

    function handleApprovalAction() {
        if(handleRefresh) {
            handleRefresh();
        }
        setApprovalModal('');
    }

    return (
        <div className='flex col-gap-8'>
            <div className='bg-ECFDF3 square-20 cursor-pointer' onClick={() => {setCueCardModal(true)}}>
                <img src={GreenTickIcon} alt ='' />
            </div>
            <div className='bg-F2F4F7 text-667085 square-20 cursor-pointer' onClick={() => setApprovalModal(REJECT)}>
                <CloseRoundedIcon sx={{color: 'inherit'}} />
            </div>
            {
                cueCardModal &&
                <EditCueCardContainer 
                    companyId={actionData.companyId} 
                    onCancel={() => setCueCardModal(false)} 
                    onSuccess={handleSuccess} 
                    url={ENDPOINT.CUECARD.cueCardUpdate()} 
                    confirmLabel="Next"
                    editCueCardModel={CuecardModel} />
            }
            {
                approvalModal === APPROVE && Object.keys(dataModel)?.length > 0 &&
                <ApproveActionModal
                    isopen={true} 
                    title="Approve seller" 
                    handleOnClose={() =>setApprovalModal('')} 
                    icon={SuccessIcon} 
                    data={dataModel}
                    apiMethod={PUT}
                    handleSuccess={handleApprovalAction}
                    customObj={{companyId: actionData?.companyId, verificationStatus: 'verified' }}
                    apiUrl={ENDPOINT.SELLERLISTING.verifySellerApi()}
                />
            }
            {
                approvalModal === REJECT &&
                <ApproveActionModal 
                    isopen={true} 
                    title="Are you sure you want to reject this seller?  " 
                    handleOnClose={() =>setApprovalModal('')} 
                    icon={WarningCircularIcon} 
                    data={SellerRejectModel}
                    apiMethod={PUT}
                    handleSuccess={handleApprovalAction}
                    customObj={{companyId: actionData?.companyId, verificationStatus: 'rejected'}}
                    apiUrl={ENDPOINT.SELLERLISTING.verifySellerApi()}
                />
            }
        </div>
    )
}

export default ActionModals;