import React, { useCallback, useEffect, useRef, useState } from 'react';
import NewTextField from '../../../CommonComponent/NewTextField';
import { API_SUCCESS_CODE, POST } from '../../../constants';
import { useDispatch } from 'react-redux';
import { fetchDataFromServer } from '../../../Redux/slice/CommonSlice';
import './style.scss';
import useOutsideClick from '../../../helper/useDetectClickOutside';

function TextSearchFilter({parentClass, selectedValue='', placeholder, handleOnSearchChange, modelData}) {
    const [searchedText, setSearchedText] = useState('');
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [listingData, setListingData] = useState([]);
    const [showListing, setShowListing] = useState(false);
    const [selctedItem, setSelctedItem] = useState({});
    const dropdownRef = useRef();
    useOutsideClick(dropdownRef, () => setShowListing(false));
    
    function handleChange(value) {
        setSearchedText(value)
    }

    useEffect(() => {
        if(selctedItem[modelData.selectedElementKey] === selectedValue) {
            setSearchedText(selctedItem[modelData.displayKey]);
        }
        else {
            setSearchedText(selectedValue);
        }
    }, [selectedValue])

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        getListing(1, 10, handleGetCB);
      }
    };

    function getListing(page, size, handleGetCB) {
        // let newFilter = prepareFilterWithSortBy(filters);
        let filterData = {}, searchCriteriaList = [];
            filterData={
                searchCriteriaList,
                dataOption: "all"
            }
        let dataToSend = {
            postBody: filterData,
            method: POST,
            url: modelData.apiUrl(page, size, searchedText),
            callback: handleGetCB
        };
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
    }

    
    function handleSelectedItem(listItem) {
        setSearchedText(listItem[modelData.displayKey]);
        setSelctedItem(listItem);
        setShowListing(false);
        handleOnSearchChange(listItem[modelData.selectedElementKey])
    }


    return (
        <div className={'' + (parentClass)}>
            <div>
                <div className='relative'>
                    <NewTextField
                        className="rounded-8 "
                        value={searchedText}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyUp={handleKeypress}
                        size="small"
                        fullWidth
                        helperText={error}
                        error={error}
                        autoComplete='off'
                        placeholder={placeholder}
                        fontSize="12px"
                        borderRadius="4px"
                    />
                    {
                        showListing &&
                        <div className='seller-match-listing text-listing-dropdown' ref={dropdownRef}>
                            {
                                listingData?.length > 0 ?
                                <ul className='bg-white'>
                                    {
                                        listingData.map((listItem, index) => {
                                            return <li className='padding-10 border-b border-D0D5DD cursor-pointer' onClick={() => handleSelectedItem(listItem)} key={listItem.id}>{listItem[modelData?.displayKey] || ''}</li>
                                        })
                                    }
                                </ul>
                                :
                                <div className='padding-10  bg-F9F5FF'>No result found</div>
                            }
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default TextSearchFilter