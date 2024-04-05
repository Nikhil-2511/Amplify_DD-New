import { Box, FormControlLabel, FormGroup, Modal, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { prepareFilterModel } from '../../../helper/commonHelper';
import { API_SUCCESS_CODE, CLOSING, DONE_DEAL, INTRODUCTION_PENDING_KEY, NEGOTIATION, ON_HOLD, POST } from '../../../constants';
import { useDispatch } from 'react-redux';
import { fetchDataFromServer, updateDealPitchdeckAccess, updateFormToServer, updateSnackbar } from '../../../Redux/slice/CommonSlice';
import { downArrowIcon, whiteTickIcon } from '../../../assets/icons/svgIcons';
import { GenericButton, OutlineButton } from '../../../CommonComponent/CustomButton';
import { ENDPOINT } from '../../../config/endpoint';
import CustomCheckbox from '../../../CommonComponent/CustomCheckbox';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DataRoomFieldLabel } from '../../../CommonModels/CommonCollection';


const style = {
    maxWidth: 500,
    width: '100%',
    bgcolor: '#353535',
    borderRadius: '10px',
    // border: '1px solid #353535',
    outline: 'none',
    color: '#fff',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    p: 4,
}; 

function ShareModal({pitchdeckData, handleOnClose}) {
    const dispatch = useDispatch();
    const [dataList, setDataList] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [noActiveDeals, setNoActiveDeals] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState('');

    useEffect(() => {
        fetchDeals();
    }, [])

    function fetchDeals() {
        let dataToSend = {
            callback: handleFetchDealsCb,
            url: ENDPOINT.DEALS.getBuyerDealsApi(1, 10),
            method: POST
        }
        let newFilter = {
            'dealStatus': [DONE_DEAL.key, NEGOTIATION.key, CLOSING.key, INTRODUCTION_PENDING_KEY, ON_HOLD.key]
        }
        dataToSend.postBody = prepareFilterModel(newFilter);
        dispatch(fetchDataFromServer(dataToSend));
    }

    function handleFetchDealsCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.elements?.length) setDataList(res?.data?.elements);
            else setNoActiveDeals(true);
        }
        else {

        }
        setDataLoaded(true);
    }

    const isChecked = (value) => {
        if (selectedValue.includes(value)) return true;
        return false;
      }

    const handleCheckboxChange = (e) => {
        let value = parseInt(e.target.value), newSelectedValue = [...selectedValue];
        if (isChecked(value)) {
          let index = newSelectedValue.findIndex((ans) => ans === value);
          newSelectedValue.splice(index, 1);
        }
        else {
            newSelectedValue.push(value);
        }
        setSelectedValue(newSelectedValue);
      }

      function handleShare() {
        if(!selectedValue?.length) return;
        let dataToSend = {
            callback: handleShareCallback,
            url: ENDPOINT.DOCUMENT.dealShare(),
            method: POST,
            postBody: {
                uid: pitchdeckData?.uid,
                dealIds: selectedValue
            }
        }
        dispatch(updateFormToServer(dataToSend))
      }

      function handleShareCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            setSelectedValue([]);
            fetchDeals();
            dispatch(updateSnackbar({
                message: `Document successfully shared`,
                isOpen: true,
            }));
        }
        else {
            dispatch(updateSnackbar({
                message: res?.data?.message,
                isOpen: true,
                type: 'error'
            }));
        }
      }

      function hasPitchdeckShared(activeDealData) {
        if(activeDealData?.dealUserDocs?.length) {
            let hasData = false;
            for(let i = 0; i < activeDealData?.dealUserDocs.length; i++) {
                let docList = activeDealData.dealUserDocs[i];
                if(pitchdeckData.uid === docList.uid) {
                    hasData = true;
                    break;
                }
            }
            return hasData;
        }
        return false;
      }

      function handleRemoveAccess(listItem) {
        setSelectedDeal('');
        let dataToSend = {
            postBody: {
                uid: pitchdeckData.uid,
                dealId: listItem?.id
            },
            callback: handleRemoveAccessCB
        }
        dispatch(updateDealPitchdeckAccess(dataToSend));
    }

    function handleRemoveAccessCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            fetchDeals();
        }
        else {
            dispatch(updateSnackbar({
                message: res?.data?.message,
                isOpen: true,
                type: 'error'
            }));
        }
    }

    function handleToggle(listItem) {
        if(!selectedDeal) setSelectedDeal(listItem.id);
        else setSelectedDeal('');
    }

    return (
        <Modal
            open={true}
            onClose={handleOnClose}>
                <div className='global-modal-container'>
                    <Box className='' sx={style}>
                        <div className='flex col-gap-20 align-center text-white'>
                            <div className='seller-approval-icon success flex justify-center items-center'>
                                {whiteTickIcon}
                            </div>
                            <div className='text-22'>Share this document</div>
                        </div>
                        {
                            noActiveDeals &&
                            <div className='margin-y16'>Documents can only be shared with buyers only when you have active deals with them.</div>
                        }
                        {
                            dataLoaded && !noActiveDeals &&
                            <div className='margin-t20 flex flex-direction-coloum row-gap-8 margin-b30'>
                                <div className='font-300'>Share this document with</div>
                                {
                                    dataList?.length > 0 &&
                                    dataList.map((listItem, index) => {
                                        if(hasPitchdeckShared(listItem)) {
                                            return (
                                                <div key={`sellerDeals${index}`}>
                                                    <div className='primary-theme flex justify-space-between align-center padding-x15 padding-y12 rounded-8 relative min-h50px'>
                                                        <div>{`D${listItem.id} - ${listItem.buyerName}`}</div>
                                                        <div className={'relative' + (selectedDeal === listItem.id ? '' : '')}>
                                                            <div className={'flex col-gap-4 align-center cursor-pointer'} onClick={() => handleToggle(listItem)}>
                                                                <TaskAltRoundedIcon sx={{color: '#fff', fontSize: '24px', fontWeight: 500, color: '#C2FFDB'}} />
                                                                <div className={'flex align-center justify-space-between text-C2FFDB font-500 text-14'}>
                                                                    <span>Shared</span>
                                                                    <KeyboardArrowDownIcon sx={{color: '#BABABA', fontSize: '16px', marginLeft: '10px'}} />
                                                                </div>
                                                            </div>
                                                            {
                                                                selectedDeal === listItem.id &&
                                                                <div className='selected-deal-pitchdeck'>
                                                                    <div className='text-FF8970 text-14 cursor-pointer' onClick={() => handleRemoveAccess(listItem)}>Remove access</div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={`sellerDeals${index}`}>
                                                    <FormGroup>
                                                        <FormControlLabel key={index} className='primary-theme padding-x15 padding-y2 rounded-8 min-h50px' sx={{marginLeft: 0, marginRight: 0}} control={<CustomCheckbox checked={isChecked(listItem.id)} onChange={(e) => handleCheckboxChange(e)} value={listItem.id} />} label={`D${listItem.id} - ${listItem.buyerName}`} labelPlacement="end" />
                                                    </FormGroup>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        <Stack direction={'row'} columnGap={1} justifyContent={'flex-end'}>
                            <OutlineButton className="text-30 capitalize" sx={{fontWeight: 400, padding: '11px 34px'}} onClick={() => handleOnClose()}>Cancel</OutlineButton>
                            {
                                dataLoaded && !noActiveDeals &&
                                <GenericButton className={"capitalize " + (selectedValue?.length ? '' : 'disabled-button')} color='modalButton' onClick={() => handleShare()} variant="contained" sx={{fontWeight: 400, padding: '11px 34px'}}>Share</GenericButton>
                            }
                        </Stack>
                    </Box>
                </div>
        </Modal>
    )
}

export default ShareModal;