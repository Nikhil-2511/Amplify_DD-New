import React from 'react';
import reloadIcon from '../../../assets/icons/refresh-cw-04.png'
import { ENDPOINT } from '../../../config/endpoint';
import { fetchDataFromServer, updateSnackbar } from '../../../Redux/slice/CommonSlice';
import { useDispatch } from 'react-redux';
import { POST } from '../../../constants';

const RecommendationsButton = ({ onClick, buttonLabel, criteriaMap }) => {
  const dispatch = useDispatch();
  function handleButtonClick(){
    let filterData = {
        criteriaMap,
      };
  
      let dataToSend = {
        postBody: filterData,
        url: ENDPOINT.MATCHING.refresh(),
        method: POST,
        callback: handleGetRefresh,
      };
      dispatch(fetchDataFromServer(dataToSend));
  }
  function handleGetRefresh(res) {
    let message= "", type =""
    if (res.status === "200") {
      message = "Successfully Refreshed"
    } 
    else {
        message = "Unable to Refresh";
        type= "error"
    }
    dispatch(updateSnackbar({
        message: message,
        isOpen: true,
        type
    }));
  }

  return (
    <div className='create-recommend-button padding-16' onClick={handleButtonClick}>
      <div className='text-grey'>
        <div className='reload-outline'> <img src={reloadIcon} alt="" /></div>
      </div>
      <span className='margin-l12 '>{buttonLabel}</span>
    </div>
  );
};

export default RecommendationsButton;
