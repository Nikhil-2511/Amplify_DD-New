import React from "react";
import { APPROVE, DELIST, REJECT, REJECTED, VERIFIED } from "../../constants";
import GreenTickIcon from '../../assets/images/greenTickIcon.svg';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch } from "react-redux";
import { updateActionState } from "../../Redux/slice/CommonSlice";
import { Chip } from "@mui/material";

function CustomBuyerMemberApproveAction({dataResponse}) {
    const dispatch = useDispatch();

    function renderSection() {
        if(dataResponse?.status) {
            switch(dataResponse?.status) {
                case REJECTED:
                    return <Chip  sx={{padding: '2px 5px', background: '#FEF3F2', height: '22px', color: '#B42318', fontWeight: 500, fontSize: '12px'}} label={`Rejected`} />
                case VERIFIED:
                    return <Chip  sx={{padding: '2px 5px', background: '#F9F5FF', height: '22px', color: '#6941C6', fontWeight: 500, fontSize: '12px'}} label={`Approved`} />
                case DELIST:
                    return <Chip  sx={{padding: '2px 5px', background: '#FEF3F2', height: '22px', color: '#B42318', fontWeight: 500, fontSize: '12px'}} label={`De-listed`} />
                default:
                    return renderDefaultSection()
            }
        }
        return ''
    }

    function handleAction(state) {
        dispatch(updateActionState({state: state, uid: dataResponse?.uid, formData: dataResponse}));
    }


    function renderDefaultSection() {
        return (
            <div className='flex col-gap-8'>
                <div className='bg-ECFDF3 square-20 cursor-pointer' onClick={() => {handleAction(APPROVE)}}>
                    <img src={GreenTickIcon} alt ='' />
                </div>
                <div className='bg-F2F4F7 text-667085 square-20 cursor-pointer' onClick={() => handleAction(REJECT)}>
                    <CloseRoundedIcon sx={{color: 'inherit'}} />
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderSection()}
        </div>
    )
}

export default CustomBuyerMemberApproveAction;