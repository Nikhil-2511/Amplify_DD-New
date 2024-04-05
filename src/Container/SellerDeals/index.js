import React, { useEffect, useMemo, useState } from 'react';
import WrappedWithFilters from '../../HOC/WrappedWithFilters';
import { ENDPOINT } from '../../config/endpoint';
import { SellerDealsTabData } from './SellerDealsTab';
import { SellerUpdateDealsModel } from './SellerDealsModel';
import { isAdminUser, isAuthenticated, reRouteUser } from '../../Services';
import { API_SUCCESS_CODE } from '../../constants';
import { fetchContactInfo } from '../../Redux/slice/ValuationSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { getQueryParamFromUrl, isMobileView } from '../../helper/commonHelper';
import { Modal, Button } from '@mui/material';
import DealsCardView from '../Dashboard/DealsCardView';

function SellerDeals() {
    const [showData, setShowData] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const useParamValue = useParams();
    const location = useLocation();
    const isMobile = isMobileView();

    useEffect(() => {
        if(!isAuthenticated()) {
            navigate('/login');
        }
        else {
            getElStatus(useParamValue?.companyId);
        }
    }, [])

    function getElStatus(companyId) {
        let dataToSend = {
          callback: handleElStatusCB,
          uid: companyId,
          type: 'seller'
        }
        dispatch(fetchContactInfo(dataToSend));
      }

    function handleElStatusCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.tncCompleted) {
                setShowData(true);
            }
            else reRouteUser(navigate);
        }
    }

    function handleGoBack() {
        let path = `/dashboard${useParamValue?.companyId ? `/${useParamValue?.companyId}` : ''}`;
        if(isAdminUser()) {
            path = `/admin-user${path}`;
        }
        navigate(path);
    }
    
    const getSellerId = useMemo(() => {
        let {search} = location, splitValue ='';
        if(search) {
            splitValue = getQueryParamFromUrl('sid');
        }
        return splitValue
    }, [location])

    function renderMobileViewComponent(props) {
        return (
            <DealsCardView {...props} />
        )
    }

    return (
      <div className={" seller-deals-container " + (isMobile ? 'padding-x16 padding-b16' : 'container padding-y48')}>
        <div className="flex flex-direction-coloum">
          <div className="flex text-B5B5B5 col-gap-10">
            <div
              className={"flex col-gap-8 cursor-pointer align-center " + (isMobile ? 'margin-t10' : '')}
              onClick={handleGoBack}
            >
              <ArrowBackRoundedIcon fontSize="18" />
              <div className="text-14 font-500">Back to Dashboard</div>
            </div>
          </div>
          <div className={"text-white " + (isMobile ? 'margin-t10 text-30 font-500' : 'text-48 margin-t30 font-600')}>
            My Deals
          </div>
          {showData && (
            <WrappedWithFilters
              apiUrl={ENDPOINT.DEALS.getBuyerDealsApi}
              pageTitle="Seller Deals"
              modifyResponseElement={SellerUpdateDealsModel}
              tabData={SellerDealsTabData()}
              hasRefreshApi={true}
              hideSortBy={true}
              hasPageFilter={true}
              defaultFilterData={isAdminUser() ? { sellerId: getSellerId } : {}}
              hidePagination={true}
              mobileViewComponent={renderMobileViewComponent}
            />
          )}
         
        </div>
      </div>
    );
}

export default SellerDeals;