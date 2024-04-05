import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_SUCCESS_CODE, APPROVE, POST, PUT } from "../../../../constants";
import ApproveActionModal from "../../../../CommonComponent/ApproveActionModal";
import { ENDPOINT } from "../../../../config/endpoint";
import SuccessIcon from "../../../../assets/images/circularTickIcon.svg";
import { CreateBuyerModel } from "./CreateBuyerModel";
import CreateBuyerForm from "./createBuyerForm";
import ApproveActionContainer from "../../../../Component/ApproveActionContainer";
import { globalAlert } from "../../../../Redux/slice/CommonSlice";
import { confirmPopUpModel } from "../../BuyerProfile/ProfileTabModel";


function FormActionModalContainer(handleRefresh) {
    const [showActionModel, setShowActionModal] = useState('');
    const [buyerData, setBuyerData] = useState({});
    const dispatch = useDispatch();

    function handleClose() {
        // handleRefresh();
        setShowActionModal('');
    }

    function handleBuyerSuccess(res) {
        if(res?.status === API_SUCCESS_CODE) {
            setBuyerData(res?.data);
            setShowActionModal(APPROVE);
        }
        else {
            dispatch(globalAlert({ isOpen: true, message: res?.data?.message }));
        }
    }

    return (
        <div>
            <div className='create-note-button padding-16' onClick={() => setShowActionModal('createBuyer')}>
                <div className='text-white'>
                    <div className='square-outline'>
                        +
                    </div>
                </div>
                <span className='margin-l12'>{'Create Buyer'}</span>
            </div>
            {
                showActionModel && showActionModel === 'createBuyer' &&
                <CreateBuyerForm
                    model={CreateBuyerModel()}
                    onSuccess={handleBuyerSuccess}
                    onClose={handleClose}
                />
            }
            {
                showActionModel && showActionModel === APPROVE &&
                <ApproveActionModal 
                    isopen={true} 
                    title="Confirm buyer acceptance" 
                    handleOnClose={handleClose} 
                    icon={SuccessIcon} 
                    data={confirmPopUpModel()}
                    apiMethod={PUT}
                    handleSuccess={handleClose}
                    customObj={{'uid': buyerData?.uid, status: 'verified'}}
                    apiUrl={ENDPOINT.BUYERS.verifyBuyerAPi()}
                />
            }
        </div>
    )
}

export default FormActionModalContainer;