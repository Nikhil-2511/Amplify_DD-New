import React, { useState } from 'react';
import { APPROVE, POST, PUT } from '../../../constants';
import ApproveActionModal from '../../../CommonComponent/ApproveActionModal';
import './style.scss';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from '../../../Redux/slice/CommonSlice';

function NotesActionModalContainer({formData, apiUrl, modelData, defaultData, icon, handleApprovalAction, handleClose, title}) {
    const [showActionModel, setShowActionModal] = useState('');
    const dispatch = useDispatch();

    function handleSuccess() {
        dispatch(updateSnackbar({
            message: "Note created successfully",
            isOpen: true
        }));
        setShowActionModal('');
        handleApprovalAction();
    }
    return (
        <div>
            <div className='create-note-button padding-16' onClick={() => setShowActionModal(APPROVE)}>
                <div className='text-white'>
                    <div className='square-outline'>
                        +
                    </div>
                </div>
                <span className='margin-l12'>{'Add a note'}</span>
            </div>
            {
                showActionModel && showActionModel === APPROVE &&
                <ApproveActionModal
                    isopen={true} 
                    title={title} 
                    handleOnClose={() => setShowActionModal('')} 
                    icon={icon} 
                    data={modelData}
                    apiMethod={POST}
                    handleSuccess={handleSuccess}
                    customObj={defaultData}
                    apiUrl={apiUrl}
                />
            }
        </div>
    )
}

export default NotesActionModalContainer;