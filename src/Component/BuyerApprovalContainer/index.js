import React, { useEffect, useState } from "react"
import { RejectModel, confirmPopUpModel } from "../../Container/AdminContainer/BuyerProfile/ProfileTabModel";
import { useDispatch, useSelector } from "react-redux";
import WarningCircularIcon from '../../assets/images/warningCircularIcon.svg';
import SuccessIcon from '../../assets/images/circularTickIcon.svg';
import { globalAlert, updateActionState } from "../../Redux/slice/CommonSlice";
import { useParams } from "react-router-dom";
import { APPROVE, PUT, REJECT } from "../../constants";
import { CORPORATE_VC_KEY, VC_PE_KEY } from "../../constants/keyVariableConstants";
import { APPROVED_BUYER_RECOMMENDED_MESSAGE } from "../../constants/MessageConstants";
import ApproveActionModal from "../../CommonComponent/ApproveActionModal";
import { ENDPOINT } from "../../config/endpoint";

function BuyerApprovalContainer({actionState, formData={}, handleRefresh}) {

    const [dataModel, setDataModel] = useState({});
    const dispatch = useDispatch();
    const useParamValue = useParams();
    const commonStore = useSelector((state) => state.commonStore);

    useEffect(() => {
        if(Object.keys(formData)?.length) {
            updateDataModel(actionState);
        }
    }, [actionState])
    
    function updateDataModel(actionState) {
        if(actionState) {
            let currentDataModel = actionState === APPROVE ? confirmPopUpModel({disableField: !formData?.primaryMember}) : RejectModel();
            let newDataModel = {};
            Object.keys(currentDataModel).forEach((keyName) => {
                if(formData[keyName]) {
                    newDataModel[keyName] = {
                        ...currentDataModel[keyName],
                        value: formData[keyName]
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

    function handleSuccess() {
        handleRefresh(useParamValue?.uid);
        handleClose();
    }

    function handleClose() {
        dispatch(updateActionState({}));
    }

    function handleApproveAction() {
        // if(formData?.type === VC_PE_KEY || formData?.type === CORPORATE_VC_KEY) {
        //     dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: APPROVED_BUYER_RECOMMENDED_MESSAGE, title: 'Add Recommended Companies'}));
        // }
        handleSuccess();
    }


    return (
        <React.Fragment>
            {
              actionState === APPROVE && Object.keys(dataModel)?.length > 0 &&
              <ApproveActionModal 
                  isopen={true} 
                  title="Confirm buyer acceptance" 
                  handleOnClose={handleClose} 
                  icon={SuccessIcon} 
                  data={dataModel}
                  apiMethod={PUT}
                  handleSuccess={handleApproveAction}
                  customObj={{'uid': commonStore?.actionState?.uid, status: 'verified'}}
                  apiUrl={ENDPOINT.BUYERS.verifyBuyerAPi()}
              />
            }
            {
              actionState === REJECT && Object.keys(dataModel)?.length > 0 &&
              <ApproveActionModal 
                  isopen={true} 
                  title="Are you sure you want to reject this buyer?  " 
                  handleOnClose={handleClose} 
                  icon={WarningCircularIcon} 
                  data={dataModel}
                  apiMethod={PUT}
                  handleSuccess={handleSuccess}
                  customObj={{'uid': commonStore?.actionState?.uid, status: 'rejected'}}
                  apiUrl={ENDPOINT.BUYERS.verifyBuyerAPi()}
              />
            }
        </React.Fragment>
    )
}

export default BuyerApprovalContainer;