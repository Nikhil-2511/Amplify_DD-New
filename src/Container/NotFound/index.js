import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { reRouteUser } from '../../Services';
import './style.scss';

function NotFound () {
  const navigate = useNavigate();
  
  function handleOnClick() {
    reRouteUser(navigate);
  }

  return (
    <div className='not-found-container'>
      <div className='not-found-container-image-bg bg-image-center flex align-center justify-center flex-direction-coloum'>
        <div>
          <p className='inline-block error-code'>404</p>
        </div>
          <p className='text-white text-24 font-500 margin-8'>Page not found</p>
          <p className='text-white margin-t5 margin-b15 padding-b5 text-22'>Sorry, we couldn’t find the page you’re looking for.</p>
          <Button className="button not-found-cta radial-grad margin-t10 capitalize text-30 font-600 text-24" onClick={handleOnClick}>Go Back Home</Button>
      </div>
    </div>
  )
}

export default NotFound;