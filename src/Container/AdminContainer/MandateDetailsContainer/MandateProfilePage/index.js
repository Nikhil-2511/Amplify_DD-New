import React, { useEffect, useState } from 'react';
import { deepClone, numbersOnly } from '../../../../helper/commonHelper';
import InternalInformationContainer from '../../../../Component/InternalInformationContainer';
import { MandateInformationModel } from '../MandateShowPageModel';
import MandateInformation from '../MandateInformation';
import CustomTabs from '../../../../CommonComponent/BuyerCommon/CustomTabs';
import { API_SUCCESS_CODE } from '../../../../constants';
import ActiveDeals from '../../BuyerProfile/ActiveDeals';
import RecommendedCompanies from '../../../../Component/RecommendedCompanies';
import { ENDPOINT } from '../../../../config/endpoint';
import { RecommendedCompanyTableModel, UpdateRMModel } from '../../../../Component/RecommendedCompanies/tablemodel';
import { recommendedSellertabData } from '../../../../Component/RecommendedCompanies/RecommendedSeller/TabData';
import { UpdateRecommendedListModel, recommendedSellerTableData } from '../../../../Component/RecommendedCompanies/RecommendedSeller/TableData';
import { useParams } from 'react-router-dom';
import { fetchMandateDetails } from '../../../../Redux/slice/MandateSlice';
import { useDispatch } from 'react-redux';
import { updateAppHeaderState } from '../../../../Redux/slice/AppNavigationSlice';

function MandateProfilePage({hideRightSection, defaultValue = {}, updateMandate, updateDocumentTitle}) {
    const [formData, setFormData] = useState({});
    const [selectedFilters, setSelectedFilters] = useState(defaultValue);
    const useParamValue = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        getMandateDetails(useParamValue?.uid);
        return () => {
            dispatch(updateAppHeaderState(false));
        }
    }, [])

    function getMandateDetails(id) {
        let dataToSend = {
          callback: handleGetCallback
        }

        if(id) dataToSend.uid = id;

        dispatch(fetchMandateDetails(dataToSend));
      }

      function handleGetCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            // setMandateData(res.data);
            setFormData(res.data);
            if(updateDocumentTitle) updateDocumentTitle(res?.data?.name);
            if(updateMandate) updateMandate(res?.data);
        }
        else {

        }
      }    

    function handleFormField(value, key) {
        let newFormData = deepClone(formData);
        newFormData[key] = value;
        if(key === 'phone') {
          if(value !== 0 && value !== '')
          if(!numbersOnly(value)) {
              return;
          } 
        }
        setFormData(newFormData);
      }

      function handleSaveAction(formType) {
        getMandateDetails(useParamValue?.uid);
      }

      function handleRangeFilter(value, key) {
        let filters = deepClone(selectedFilters);
        filters[key] = { value, type: "range" };
        setSelectedFilters(filters);
      }

    const renderMandateInfo = () => {
        return(
            <div className='profile-page-container justify-space-between'>
                <div className='profile-page-form-section flex-1'>
                    <MandateInformation formData = {formData} handleFormField={handleFormField} onChange={(value) => handleRangeFilter(value)} handleSaveAction={() => handleSaveAction('preference')}  />
                </div>
                {
                !hideRightSection &&
                <div className='other-information-section max-width420 w-full'>
                    <React.Fragment>
                        <InternalInformationContainer cardData={formData} cardModel={MandateInformationModel()} />
                    </React.Fragment>
                </div>
                }
            </div>
        )
    } 

    return (
        <div className='mandate-profile-page '>
            <div>
                {renderMandateInfo()}
            </div>
        </div>
    )
}

export default MandateProfilePage;