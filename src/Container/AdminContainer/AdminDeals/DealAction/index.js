import React, { useState } from 'react';
import ApproveActionModal from '../../../../CommonComponent/ApproveActionModal';
import SuccessIcon from '../../../../assets/images/circularTickIcon.svg';
import { DealApprovalModel } from './DealActionDataModel';
import { API_SUCCESS_CODE, CLOSING, INTRODUCTION_PENDING_KEY, NEGOTIATION, ON_HOLD, POST } from '../../../../constants';
import { ENDPOINT } from '../../../../config/endpoint';
import { Button, Modal, Stack } from '@mui/material';
import NotesActionModalContainer from '../../../../Component/NotesComponent/NotesActionModalContainer';
import { noteActionModal } from './CreateDealModel';
import CreateNoteIcon from '../../../../assets/images/createNoteCircularIcon.svg';
import NoteViewIcon from '../../../../assets/images/addNotes.svg';
import NoteCreateIcon from '../../../../assets/images/notesNew.svg';
import BriefcaseReload from '../../../../assets/images/briefcaseReload.svg';
// import { getAppBaseUrl } from '../../../../helper/commonHelper';
// import NoteViewIcon from '../../../../assets/images/noteViewIcon.svg';
// import NoteCreateIcon from '../../../../assets/images/NoteCreateIcon.svg';
// import BriefcaseDot from '../../../../assets/images/briefcaseDot.svg';
import { deepClone, prepareFilterModel } from '../../../../helper/commonHelper';
import { Box } from '@mui/system';
import NoteListItem from '../../../../Component/NoteListItem';
import { NewButton } from '../../../../CommonComponent/NewCustomButton';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDataFromServer, updateSnackbar } from '../../../../Redux/slice/CommonSlice';

function DealAction({actionData, handleRefresh}) {
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [latestNote, setLatestNote] = useState({});

    const style = {
        maxWidth: 640,
        width: '100%',
        bgcolor: theme?.palette?.modalStyling?.main || '#121212',
        borderRadius: '10px',
        // border: '1px solid #353535',
        outline: 'none',
        color: theme?.palette?.modalStyling?.contrastText || '#fff',
        p: 4,
    };
    
    function handleApprovalAction() {
        if(handleRefresh) {
            handleRefresh();
        }
        setShowApprovalModal(false);
    }

    function handleNavigation(id) {
        window.open(`/admin/deal-notes/${id}`, '_blank');
    }

    function getLatestReminder(dealId) {
        let filterValue = {
            noteIdType: 'deal',
            primaryid: dealId
        };
        let filters = prepareFilterModel(filterValue);
        let dataToSend = {
            postBody: filters,
            method: POST,
            callback: handleGetReminderCb,
            url: ENDPOINT.NOTES.getLatestNote()
        }
          dispatch(fetchDataFromServer(dataToSend));
    }

    function handleGetReminderCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data) {
                setShowApprovalModal('reminderView');
                setLatestNote(res?.data);
            }
            else {
                handleNavigation(actionData?.id)
            }
        }
        else {
            dispatch(updateSnackbar({
                message: res?.data?.message,
                isOpen: true,
                type: 'error'
            }));
        }
    }

    function editDealData() {
      let model = deepClone(DealApprovalModel);
      let preFilledDealStatus = [
        INTRODUCTION_PENDING_KEY,
        NEGOTIATION.key,
        CLOSING.key,
        ON_HOLD.key,
      ];
      if (preFilledDealStatus?.includes(actionData?.dealStatus)) {
        model.dealStatus.value = actionData?.dealStatus;
        model.subStatus.value = actionData?.subStatus;
      }
      return model;
    }

    return (
        <div className='deal-action-container'>
            <Stack direction={'row'} columnGap={1}>
            <div className='text-6941C6 padding-y4 font-500 text-center padding-x8 bg-F9F5FF rounded-16 cursor-pointer text-12' onClick={() => setShowApprovalModal('editDeal')}>
                    <img src={BriefcaseReload} alt="" />
                </div>
                <div className='text-6941C6 padding-y4 font-500 text-center padding-x8 bg-F9F5FF rounded-16 cursor-pointer text-12' onClick={() => getLatestReminder(actionData?.id)} >
                    <img src={NoteCreateIcon} alt="" />
                </div>
                <div className='text-6941C6 padding-y4 font-500 text-center padding-x8 bg-F9F5FF rounded-16 cursor-pointer text-12' onClick={() => setShowApprovalModal('editReminder')}>
                    <img src={NoteViewIcon} alt="" />
                </div>
            </Stack>

            {
                showApprovalModal === 'editDeal' &&
                <ApproveActionModal
                    isopen={true} 
                    title={`Edit deal state for D${actionData?.id}`} 
                    handleOnClose={() =>setShowApprovalModal(false)} 
                    icon={SuccessIcon} 
                    data={editDealData()}
                    apiMethod={POST}
                    handleSuccess={handleApprovalAction}
                    customObj={{buyerId: actionData?.buyerId, companyId: actionData?.sellerId }}
                    apiUrl={ENDPOINT.DEALS.updateDealActionApi()}
                />
            }
            {
                showApprovalModal === 'editReminder' &&
                <ApproveActionModal
                    isopen={true} 
                    title={'Create Note'} 
                    handleOnClose={() => setShowApprovalModal('')} 
                    icon={CreateNoteIcon} 
                    data={noteActionModal()}
                    apiMethod={POST}
                    handleSuccess={handleApprovalAction}
                    customObj={{noteIdType: 'deal', primaryid: actionData?.id}}
                    apiUrl={ENDPOINT.NOTES.createNoteApi()} 
                    companyData = {actionData}
                />
            }
            {
                showApprovalModal && showApprovalModal === 'reminderView' &&
                <Modal
                    open={!!showApprovalModal}
                    onClose={() => setShowApprovalModal('')}
                >
                    <div className='global-modal-container'>
                        <Box sx={style}>
                            <NoteListItem noteListItem={latestNote} handleRefresh={handleRefresh} />
                            <div className='modal-action-container flex col-gap-10 justify-end padding-t20'>
                                <Button className='capitalize' sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={() => setShowApprovalModal('')}>
                                    {'Cancel'}
                                </Button>
                                <NewButton className='capitalize' color="secondary" sx={{fontWeight: 500}} variant="contained" onClick={() => handleNavigation(actionData?.id)}>
                                    {'View all notes'}
                                </NewButton>
                            </div>
                        </Box>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default DealAction;