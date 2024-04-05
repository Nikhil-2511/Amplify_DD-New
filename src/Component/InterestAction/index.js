import React from 'react';
import { getBuyerParamData, handleCompanyInterest } from '../../helper/actionHelper';
import './style.scss';

function InterestAction({id, className = '', label, actionType, handleSuccess, data}) {

    function handleAction() {
        handleCompanyInterest({action: actionType, id: id, callback: handleActionCb, companyUid : data?.companyId})
    }

    function handleActionCb(action, res) {
        getBuyerParamData({cb: () => handleSuccess(action, res)});
    }

    return (
        <div className={'interest-action-container ' + (className || '')} onClick={handleAction}>
            {label}
        </div>
    ) 
}

export default InterestAction;