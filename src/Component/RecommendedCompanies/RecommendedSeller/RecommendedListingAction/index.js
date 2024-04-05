import React from 'react'
import { useDispatch } from 'react-redux';
import { API_SUCCESS_CODE, POST, SOMETHING_WENT_BAD } from '../../../../constants';
import { ENDPOINT } from '../../../../config/endpoint';
import { updateFormToServer, updateSnackbar } from '../../../../Redux/slice/CommonSlice';
import { Chip, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

function RecommendedListingAction({apiData, defaultObj={}, selectedTab, inputValue}) {
    const dispatch = useDispatch();
    const useParam = useParams();

    function handleAction(state) {
        let postBody = {
            "primaryUid": useParam?.uid,
            ...defaultObj
        }
        if(selectedTab?.searchType === 'text') {
            postBody.prompt = inputValue;
        }
        let dataToSend = {
            method: POST,
            postBody: postBody,
            url: ENDPOINT.MATCHING.create(),
            callback: handleCb
        }
        dispatch(updateFormToServer(dataToSend))
    }

    function handleCb(res) {
        let message = '', status = false;
        if(res?.status === API_SUCCESS_CODE) {
            message = 'Seller Recommended Successfully';
            status = true;
        }
        else {
            message = res?.data?.message || SOMETHING_WENT_BAD;
        }
        dispatch(updateSnackbar({
            message,
            isOpen: true
        }));
        // if(status && handleRefresh) handleRefresh();
    }

    return (
        <React.Fragment>
            {
                <Stack direction={'row'} columnGap={1}>
                    <span>
                        <Chip
                            label={"Share"}
                            className='text-12 font-500'
                            sx={{background: '#ECFDF3', color: '#027A48'}}
                            onClick={() => handleAction("shared")}
                        />
                    </span>
                </Stack>
            }
        </React.Fragment>
    )
}

export default RecommendedListingAction;