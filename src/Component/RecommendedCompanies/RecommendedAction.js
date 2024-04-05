import React from 'react';
import { Chip, Stack } from '@mui/material';
import { API_SUCCESS_CODE, DiSCOVERY_KEY, POST, SOMETHING_WENT_BAD } from '../../constants';
import { useDispatch } from 'react-redux';
import { updateFormToServer, updateSnackbar } from '../../Redux/slice/CommonSlice';
import { ENDPOINT } from '../../config/endpoint';
import { ACCEPTED_KEY } from '../../constants/keyVariableConstants';

function RecommendedAction({apiData, handleRefresh, primaryIdType, user}) {
    const dispatch = useDispatch();

    function isValidSatus () {
        return apiData?.status === ACCEPTED_KEY &&(!apiData?.dealStatus || apiData?.dealStatus === DiSCOVERY_KEY);
    }

    function handleAction(state) {
        let dataToSend = {
            method: POST,
            postBody: {
                uid: apiData?.uid,
                primaryIdType: primaryIdType,
                status: state,
            },
            url: ENDPOINT.MATCHING.action(),
            callback: (res) => handleCb(state, res)
        }
        dispatch(updateFormToServer(dataToSend));
    }

    function handleCb(state, res) {
        let message = '', status = false;
        if(res?.status === API_SUCCESS_CODE) {
            if(state !== 'rejected') message = `${user} recommended and is now visible in buyer’s recommended companies.`;
            else message = `${user} recommendation declined`;
            status = true;
        }
        else {
            message = res?.data?.message || SOMETHING_WENT_BAD;
        }
        dispatch(updateSnackbar({
            message,
            isOpen: true
        }));
        if(status && handleRefresh) handleRefresh();
    }

    return (
        <React.Fragment>
            {
                isValidSatus() ?
                <Stack direction={'row'} columnGap={1}>
                    <span>
                        <Chip
                            label={"Reject"}
                            className='text-12 font-500'
                            sx={{background: '#FEF3F2', color: '#B42318'}}
                            onClick={() => handleAction("rejected")}
                        />
                    </span>
                    <span>
                        <Chip
                            label={"Share"}
                            className='text-12 font-500'
                            sx={{background: '#ECFDF3', color: '#027A48'}}
                            onClick={() => handleAction("shared")}
                        />
                    </span>
                </Stack>
                :
                ''
            }
        </React.Fragment>
    )
}

export default RecommendedAction;