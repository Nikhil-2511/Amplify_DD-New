import React, { useState } from 'react';
import NewTextField from '../../CommonComponent/NewTextField';
import { API_SUCCESS_CODE, POST } from '../../constants';
import { ENDPOINT } from '../../config/endpoint';
import { useDispatch } from 'react-redux';
import { fetchDataFromServer, updateSnackbar } from '../../Redux/slice/CommonSlice';
import CircularShareIcon from '../../assets/images/circularShareIcon.svg';
import ModalWrapper from '../../ModalWrapper';
import CopyLinkIcon from '../../assets/images/newCopyLinkIcon.svg';
import { APP_BASE_URL } from '../../config';
import { createCuecardLink } from '../../Redux/slice/CuecardSlice';
import { NewButton } from '../../CommonComponent/NewCustomButton';

const styles = {
    maxWidth: 640,
}

function ShareCuecardComponent({sellerData, handleClose}) {
    const [inputValue, setInputVaue] = useState('');
    const [error, setError] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState({});
    const size = 10;
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [listingData, setListingData] = useState([]);
    const [showListing, setShowListing] = useState(false);
    const [generatedLink, setGeneratedLink] = useState("");

    function handleChange(value) {
        setInputVaue(value)
        setSelectedBuyer({});
        setError('');
        setGeneratedLink('');
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleOnClick();
      }
    };

    function handleOnClick() {
        if(inputValue) {
            getBuyerListing(1, size, handleGetCB);
            
        }
    }

    
    function getBuyerListing(page, size, handleGetCB) {
        // let newFilter = prepareFilterWithSortBy(filters);
        let filterData = {}, searchCriteriaList = [];
            filterData={
                searchCriteriaList,
                dataOption: "all"
            }
        let dataToSend = {
            postBody: filterData,
            method: POST,
            url: `${ENDPOINT.BUYERS.getBuyerListApi(page, size)}&searchString=${inputValue}`,
            callback: handleGetCB
        };
        setIsLoading(true);
        dispatch(fetchDataFromServer(dataToSend));
    }

    function handleGetCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            setListingData(res?.data?.elements || []);
            setShowListing(true);
        }
        else {
            setError(res?.data?.error);
            setListingData([]);
        }
        setIsLoading(false);
    }

    function handleSelectedItem(listItem) {
        setSelectedBuyer(listItem);
        setInputVaue(listItem.companyName);
        setShowListing(false);
        handleSubmit(listItem)
    }

    
    function handleSubmit(listItem) {
        if(!listItem.id) return;
        let url = ENDPOINT.CUECARD.cueCardLinkCreate();
        let dataToSend = {
            postBody: {
                "companyPid": sellerData?.id,
                "buyerPid": listItem?.id
            },
            url,
            callback: handleSubmitCb
        }
        dispatch(createCuecardLink(dataToSend))
    }

    function handleSubmitCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            setGeneratedLink(res?.data?.uid || '');
        }
        else {
            setError(res?.data?.message);
        }
    }

    function onCancel() {
        handleClose();
    }

    function getCueCardUrl() {
        return `/buyer/view-cue-card/${generatedLink}`;
    }

    function handleLinkCopy() {
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.origin + getCueCardUrl())
            .then(() => {
                dispatch(updateSnackbar({
                    message: "Cue card link copied to clipboard.",
                    isOpen: true,
                }));
            })
            .catch(() => {
                dispatch(updateSnackbar({
                    message: "Please try again",
                    isOpen: true,
                }));
            });
        }
    }

    return (
        <div className='flex flex-direction-coloum row-gap-32'>
            <div>
                <div className='margin-b6 text-344054 text-14 font-500'>Buyer</div>
                <div className='relative'>
                    <NewTextField
                        className="rounded-8 "
                        value={inputValue} 
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyUp={handleKeypress}
                        size="small"
                        fullWidth
                        placeholder={'Type the name of the buyer and click ‘Enter’'}
                        helperText={error}
                        error={error}
                        autoComplete='off'
                    />
                    {
                        showListing &&
                        <div className='seller-match-listing'>
                            {
                                listingData?.length > 0 ?
                                <ul className='bg-white'>
                                    {
                                        listingData.map((listItem, index) => {
                                            return <li className='padding-10 border-b border-D0D5DD cursor-pointer' onClick={() => handleSelectedItem(listItem)} key={listItem.id}>{listItem?.companyName || ''}</li>
                                        })
                                    }
                                </ul>
                                :
                                <div className='padding-10'>No result found</div>
                            }
                        </div>

                    }
                </div>
            </div>
            {
                generatedLink &&
                <div>
                    <div className='border border-D0D5DD padding-10 col-gap-12 flex justify-space-between align-center cursor-pointer' onClick={() => handleLinkCopy()}>
                        <div>{`${APP_BASE_URL}buyer/view-cue-card/${generatedLink}`}</div>
                        <div className='' style={{width: '20px', display: 'inline-flex'}}>
                            <img src={CopyLinkIcon} alt="" />
                        </div>
                    </div>
                    <div className='text-14 text-667085 margin-t6'>
                        Note: The link you're sharing is unique to this buyer and remains active for just 12 hours. No login is required for the buyer to view the cue card, but login required for actions.
                    </div>
                </div>
            }
            <div className='modal-action-container flex col-gap-10 justify-end'>
                <NewButton className='capitalize' sx={{color: '#1D2939', fontWeight: 500}} variant='text' onClick={() => onCancel()}>
                    {'Close'}
                </NewButton>
            </div>
        </div>
    )
}

export default ModalWrapper(ShareCuecardComponent, 'Share Cue Card', CircularShareIcon, styles);