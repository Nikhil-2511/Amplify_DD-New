import { Button } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../CommonComponent/Loader';
import { COMPANY_FOUND, COMPANY_NOT_FOUND, IS_VALID_COMPANY } from '../../constants';
import { getMetric, getCompanyProfile, globalMessage, isCompanyExists, isMobileView } from '../../helper/commonHelper';
import { useInterval } from '../../helper/customHook';
import { updateFirstTimeUser, updateRevaluation } from '../../Redux/slice/CommonSlice';
import { isAuthenticated } from '../../Services';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils';
import ValuationReport from '../ValuationReport';
import './style.scss';
import { GenericButton, OutlineButton } from '../../CommonComponent/CustomButton';
import SkeletonPattern from '../../Container/SkeletonPattern';

function Valuation() {
  const [valuationData, setValuationData] = useState({});
  const [metricData, setMetricData] = useState({});
  const [metricDataLoaded, setMetricDataLoaded] = useState(false);
  const [valuationDataLoaded, setValuationDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [startFetching, setStartFetching] = useState(false);
  const [count, setCount] = useState(0);
  const countLimit = 4;
  const dispatch = useDispatch();
  const isMobileDevice = isMobileView();

  useEffect(() => {
    // Redirect for company data not completed.
    // isCompanyExists(navigate);
    if (isAuthenticated()) {
      if (getLocalStorage(IS_VALID_COMPANY) === COMPANY_NOT_FOUND) {
        navigate('/valq');
        return;
      }
      else {
        getAllData();
      }
    }
    else navigate('/login');
  }, [])

  useInterval(() => {
    getMetricData();
  }, startFetching ? 2000 : null)

  const companyProfileData = () => {
    getCompanyProfile(getDataCallback, '', true);
  }

  const getMetricData = () => {
    getMetric(metricCallback, '', true);
  }

  const getAllData = () => {
    setIsLoading(true);
    companyProfileData();
    getMetricData();
  }

  const getDataCallback = (res) => {
    if (res.status === '200') {
      setValuationDataLoaded(true);
      setValuationData(res?.data);
    }
    else if (res?.data?.message) {
      globalMessage(res.data.message);
    }
    setIsLoading(false)
  }

  const metricCallback = (res) => {
    if (res?.status === '200' || (count >= countLimit)) {
      setStartFetching(false);
    }
    setCount(count + 1);

    if (res?.status === '200') {
      setMetricDataLoaded(true);
      setMetricData(res.data);
    }
    else {
      if (res?.data?.message) {
        if (count > countLimit) {
          globalMessage(res.data.message);
        }
      }
      !startFetching && count === 0 && setStartFetching(true);
    }
    setIsLoading(false);
  }

  function handleNavigation(value) {
    navigate(value)
  }

  function handleRestartValuation() {
    dispatch(updateRevaluation(true));
    handleNavigation("/valq");
  }

  function handleContinueCta() {
    dispatch(updateRevaluation(false));
    // dispatch(updateFirstTimeUser(true));
    handleNavigation("/dashboard")
  }

  return (
    <div className='valuation-container'>
      {
        metricDataLoaded && valuationDataLoaded &&
        <div className='container'>
          <ValuationReport valuationData={valuationData} metricData={metricData} />
          <div className='flex col-gap-15'>
            <OutlineButton className={"w-full text-30 font-600 capitalize " + (isMobileDevice ? 'text-14 font-500' : 'text-18 font-600')} sx={{fontSize: (isMobileDevice ? '14px' : '18px')}} onClick={() => handleRestartValuation()}>Restart valuation</OutlineButton>
            <GenericButton className={"primary capitalize w-full text-30 font-600 " + (isMobileDevice ? 'text-14 font-500' : 'text-18 font-600')} sx={{fontSize: (isMobileDevice ? '14px' : '18px')}} onClick={() => handleContinueCta()}>{`${isMobileDevice ? 'Go' : 'Continue'} to dashboard`}</GenericButton>
          </div>
        </div>
      }
      {
        ((!valuationDataLoaded && !metricDataLoaded) || (valuationDataLoaded && !metricDataLoaded) || (!valuationDataLoaded && metricDataLoaded)) &&
        <SkeletonPattern />
      }
      {/* {
        isLoading &&
        <Loader isOpen={isLoading} />
      } */}
    </div>
  )
}

export default Valuation;