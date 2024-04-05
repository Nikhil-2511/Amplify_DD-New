import React from 'react';
import { getDate, getValueFromArr, statusMap } from '../../helper/commonHelper';
import { AllNotesArr } from '../../CommonModels/CommonCollection';
import { Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { API_SUCCESS_CODE, PUT } from '../../constants';
import { ENDPOINT } from '../../config/endpoint';
import { updateFormToServer, updateSnackbar } from '../../Redux/slice/CommonSlice';
import ReminderNotificationIcon from '../../assets/images/reminderNotificationIcon.svg';

function NoteListItem({noteListItem, handleRefresh, className}) {
    const dispatch = useDispatch();
    const reminderStatus = statusMap(noteListItem?.reminderState,  noteListItem?.reminderDate);
    
    function handleStateChange(action) {
        let dataToSend = {
            postBody: prepareData(action),
            method: PUT,
            url: ENDPOINT.NOTES.updateNoteApi(),
            callback: handleCB
        }

        dispatch(updateFormToServer(dataToSend));
    }

    function handleCB(res) {
        let message = ''
        if(res?.status === API_SUCCESS_CODE) {
            message = 'Successfully updated';
            if(handleRefresh) handleRefresh();
        }
        else {
            if(res?.data?.message) {
                message = res?.data?.message;
            }
        }

        if(message) {
            dispatch(updateSnackbar({
                message: message,
                isOpen: true
            }));
        }
    }

    function prepareData(action) {
        let actionData = action;
        return {
            ...noteListItem,
            reminderState: actionData
        }
    }
    
    return (
        <div className='notes-content-wrapper'>

            <div className={'bg-white flex flex-direction-coloum row-gap-24 ' + (className || '')}>
                <div className='flex align-center justify-space-between col-gap-12'>
                    <div className='flex align-center col-gap-8'>
                        <div className='text-19 text-101828 font-500'>{noteListItem?.title || ''}</div>
                        <Chip
                            label={getValueFromArr(noteListItem.type, AllNotesArr)}
                            className='text-12 font-500'
                            sx={{background: '#FFFAEB', color: '#B54708'}}
                        />
                    </div>
                    {
                        noteListItem?.reminderState &&
                        <div>
                            <img src={ReminderNotificationIcon} alt="" />
                        </div>
                    }
                </div>
                {
                    noteListItem?.description  &&
                    <div className='padding-12 text-667085 text-16 bg-F9FAFB'>
                        { noteListItem?.description }
                    </div>
                }
                <div className='flex justify-space-between align-center'>
                    <div className='flex col-gap-4 align-center'>
                        <span className='text-98A2B3 text-12'>Created by</span>
                        <span className='text-475467 font-500 text-14'>{noteListItem?.createdBy}</span>
                        {
                            noteListItem?.createdAt &&
                            <span className='margin-l4 text-12 font-500 text-98A2B3'>{getDate(noteListItem?.createdAt, 'DD-MMM-YYYY')}</span>
                        }
                    </div>
                    {
                        !!noteListItem?.reminderDate &&
                        <div>
                            {
                                reminderStatus?.label === 'Completed' &&
                                <div className='font-500 text-green text-12'>{`Due - ${getDate(noteListItem?.reminderDate, 'DD-MMM-YYYY')} | ${reminderStatus?.label} - ${getDate(noteListItem?.updatedAt, 'DD-MMM-YYYY')}`}</div>
                            }
                            {
                                reminderStatus?.label !== 'Completed' &&
                                <Chip
                                    label={reminderStatus?.label === 'Overdue' ? `Due since ${getDate(noteListItem?.reminderDate, 'DD-MMM-YYYY')}` : ` Due on ${getDate(noteListItem?.reminderDate, 'DD-MMM-YYYY')}`}
                                    className='text-12 font-500'
                                    sx={{background: reminderStatus?.bg, color: reminderStatus?.color}}
                                    onClick={() => handleStateChange('resolved')}
                                />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NoteListItem;