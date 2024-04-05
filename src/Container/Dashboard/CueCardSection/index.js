import React, { useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { copyLinkIcon, exclamationCircleRed } from '../../../assets/icons/svgIcons';
import { emailIsValid } from '../../../helper/commonHelper';
import { addCueCardEmail } from '../../../Redux/slice/CuecardSlice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './style.scss';
import { GenericButton, OutlineButton } from '../../../CommonComponent/CustomButton';

function CueCardSection({className, companyId}) {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [counter, setCounter] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleAddEmail() {
    setEmailError('');
    if(!emailIsValid(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    let dataToSend = {
      postBody: {
        buyerEmail: email,
        companyId
      },
      callback: handleCallback
    }
    dispatch(addCueCardEmail(dataToSend));
  }

  useEffect(() => {
    if(counter) {
      setTimeout(() => {
        setCounter(false);
        setEmailError('');
        setSuccessMessage('');
      }, [2000])
    }
  }, [counter])

  function handleCallback(res) {
    if(res?.status === '200') {
      setEmail('');
      setCounter(true);
      setSuccessMessage(res?.message || 'Successfully email added.');
    }
    else {
      if(res?.message) setEmailError(res.message);
    }
  }

  function handleViewCueCard() {
    let url = getCueCardUrl();
    if(url) {
      navigate(url);
    }
  }

  function getCueCardUrl() {
    if(companyId) {
      setEmailError('');
      setCounter(true);
      setSuccessMessage('Link coppied');
      return `/cue-card/${companyId}`
    }
    return ''
  }


  return (
    <div className={'' + (className? className : '')}>
      <div className='flex justify-space-between padding-x20 padding-b15 border-b border-282828 margin-b15'>
        <div className='text-24'>Cue Card</div>
        <div></div>
      </div>
      <div className='padding-b5 padding-x20 '>
        <Stack spacing={1} direction="row" >
          <div className='flex-1'>
            <input className='cue-card-section-input' data-cuecard="text" value={email} onChange={(e) => setEmail(e.target.value)} size="small" placeholder="Add business email" />
          </div>
          <div>
            <OutlineButton className="capitalize w-full text-16" onClick={() => handleAddEmail()}>Add</OutlineButton>
          </div>
        </Stack>
        <div className='margin-y16 flex align-center cursor-pointer' onClick={() => {navigator.clipboard.writeText(window.location.origin + getCueCardUrl())}}><span>{copyLinkIcon}</span><span className='padding-l16'>Copy Link</span></div>
        {emailError && <div className='text-FF464D flex align-center relative cue-card-error'><div className='error-icon'>{exclamationCircleRed}</div><div className='padding-l25 text-14'>{emailError}</div></div>}
        {!emailError && successMessage && <div className='text-FF464D flex align-center relative cue-card-error'><div className='error-icon'>{<CheckCircleOutlineIcon sx={{color: '#2e7d32', fontSize: "20px"}} />}</div><div className='padding-l25 text-success text-16'>{successMessage}</div></div>}
        <div className='padding-t16'>
          <GenericButton className="accent capitalize w-full text-16 font-500" onClick={handleViewCueCard}>View cue card</GenericButton>
        </div>
      </div>
    </div>
  )
}

export default CueCardSection;