import { Box, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PdfviewComponent from '../../../Component/PdfviewComponent.js';
import { deepClone, getFieldLabelData, isMobileView } from '../../../helper/commonHelper';
import CustomCheckboxIcon from '../../../CommonComponent/CustomCheckboxIcon';
import QuestionTextArea from '../../../Component/QuestionTextArea';
import { GenericButton } from '../../../CommonComponent/CustomButton';
import { API_SUCCESS_CODE, PUT, SIGNED_KEY } from '../../../constants';
import { ENDPOINT } from '../../../config/endpoint';
import { useDispatch } from 'react-redux';
import { updateFormToServer } from '../../../Redux/slice/CommonSlice';
import SellerEl from './SellerNewEL.pdf';
import { whiteTickIcon } from '../../../assets/icons/svgIcons.js';
import './style.scss';
import { isAdminUser } from '../../../Services/index.js';
import { downloadLetter } from '../../../Redux/slice/ValuationSlice.js';
import { trackEvent } from '../../../helper/posthogHelper.js';
import { SELLER_SIGN_EL_SUCCESS } from '../../../constants/posthogEvents.js';

const compStyle = {
    width: '100%',
    bgcolor: '#fff',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    p: 3,
    maxWidth: 688,
    height: '90vh',
    background: '#353535',
    color: '#fff',
    display: 'flex',
    rowGap: '20px',
    flexDirection: 'column'
}

const  intialFieldData = (tncDetails) => {
    return (
        {
            "sellerEngagementTncConsent": {
                value: tncDetails?.sellerEngagementTncConsent || false
            },
            "sellerFeesTncConsent": {
                value: tncDetails?.sellerFeesTncConsent || false,
            },
            "tncCompanyName" : {
                value: tncDetails?.tncCompanyName || '',
                placeholder: `Enter your company's official name`
            },
            "tncName": {
                value: tncDetails?.tncName || '',
                placeholder: 'Enter your full name'
            }
        }
    )
}

function ElModal({handleClose, handleSuccess, tncDetails, companyId, objectiveFlow}) {
    const [formData, setFormData] = useState(intialFieldData());
    const [enagagementLetterPDF, setEnagagementLetterPDF] = useState(null);
    const dispatch = useDispatch();
    const [canEdit, setCanEdit] = useState(true);

    useEffect(() => {
        if(!objectiveFlow && tncDetails?.state === SIGNED_KEY && tncDetails?.tncCompanyName && tncDetails?.tncName) {
            setFormData(intialFieldData(tncDetails));
            setCanEdit(false);
        }
        if(objectiveFlow) {
            let tncData = {
                tncCompanyName: tncDetails?.tncCompanyName,
                tncName: tncDetails?.tncName
            }
            setFormData(intialFieldData(tncData));
        }
    }, [tncDetails])

    function handleDownloadLetter(){
        let prepareObj = {};
        if(isAdminUser()){
            prepareObj = {
                criteriaMap: {
                  primaryIdType: "seller",
                  primaryUid: companyId
                }
            }
        }
        let dataToSend = {
          postBody: prepareObj,
          callback: downloadEngagementCallback,
        };
        if(objectiveFlow) dataToSend['latest'] = true;
        // setIsLoading(true);
        dispatch(downloadLetter(dataToSend));
      };
      const downloadEngagementCallback = (res) => {
        if (res?.status === API_SUCCESS_CODE) {
            setEnagagementLetterPDF(res.data)
        }
      };
    

    useEffect(()=>{
        handleDownloadLetter()
    },[])

    function handleFieldUpdate(value, key) {
        if(!canEdit) return;
        let newFormData = deepClone(formData);
        newFormData[key].value = value;
        if(newFormData[key].error) {
            newFormData[key].error = false;
        }

        setFormData(newFormData);
    }

    function renderComponent() {
        return (
            <div>
                <div className='text-14 margin-t12 flex align-center cursor-pointer' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'sellerEngagementTncConsent', 'value'), 'sellerEngagementTncConsent')}>
                    <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'sellerEngagementTncConsent', 'value')} />
                    <span className='text-white'>
                        {
                            objectiveFlow ? 
                            `By marking this box, you agree to remitting a success fee as set out in DoneDeal’s Engagement Letter above.`
                            :
                            `By marking this box, you agree to remitting a success fee as set out in DoneDeal’s Engagement Letter above.`
                        }
                    </span>
                </div>
                <div className='text-14 margin-t12 flex align-center cursor-pointer' onClick={() => handleFieldUpdate(!getFieldLabelData(formData, 'sellerFeesTncConsent', 'value'), 'sellerFeesTncConsent')}>
                    <CustomCheckboxIcon isActive={getFieldLabelData(formData, 'sellerFeesTncConsent', 'value')} />
                    <span className='text-white'>
                        {
                            objectiveFlow ?
                            `By marking this box, you agree to the other terms set out in the Engagement Letter above.`
                            :
                            `By marking this box, you agree to the other terms set out in the Engagement Letter above.`
                        }
                    </span>
                </div>
                <div className='text-18 font-500 lh-28 margin-t20 text-B5B5B5'>
                    <div>
                        Please enter your name to approve the acceptance of interest
                    </div>
                    <div>
                        This will serve as your digital signature.
                    </div>
                </div>
                <div className='margin-t10'>
                    <QuestionTextArea
                        className="rounded-8 "
                        onChange={(e) => handleFieldUpdate(e.target.value, 'tncName')}
                        size="small"
                        fullWidth
                        autoComplete='off'
                        fieldsetBgColor="#282828"
                        placeholder={getFieldLabelData(formData, 'tncName', 'placeholder')}
                        value={getFieldLabelData(formData, 'tncName', 'value')} 
                        error={!!getFieldLabelData(formData, 'tncName', 'error')}
                        helperText={getFieldLabelData(formData, 'tncName', 'error') ? getFieldLabelData(formData, 'tncName', 'helperText') : ''}
                    />
                </div>
                <div className='margin-t10 margin-b20'>
                    <QuestionTextArea
                        className="rounded-8 "
                        onChange={(e) => handleFieldUpdate(e.target.value, 'tncCompanyName')}
                        size="small"
                        fullWidth
                        isEditable={canEdit}
                        autoComplete='off'
                        fieldsetBgColor="#282828"
                        placeholder={getFieldLabelData(formData, 'tncCompanyName', 'placeholder')}
                        value={getFieldLabelData(formData, 'tncCompanyName', 'value')} 
                        error={!!getFieldLabelData(formData, 'tncCompanyName', 'error')}
                        helperText={getFieldLabelData(formData, 'tncCompanyName', 'error') ? getFieldLabelData(formData, 'tncCompanyName', 'helperText') : ''}
                    />
                </div>
            </div>
        )
    }

    function handleVerify() {
        let { error, data } = isDataNotValid();
        if(error) return ;
        let dataToSend = {
            postBody: {"tnc": data},
            method: PUT,
            url: ENDPOINT.TNC.updateTnc(),
            callback: handleUpdateCB
        }
        dispatch(updateFormToServer(dataToSend))
    }

    function handleUpdateCB(res) {
        if(res?.status === API_SUCCESS_CODE) {
            handleSuccess();
            trackEvent(SELLER_SIGN_EL_SUCCESS);
        }
        else {
            if(res?.data?.message) {
                alert(res.data.message);
            }
        }
       }

    function isDataNotValid() {
        let newFormData = deepClone(formData), error = false, data = {};
        if(Object.keys(newFormData)?.length) {
            Object.keys(newFormData).forEach(fieldKey => {
                let fieldData = newFormData[fieldKey];
                if(!fieldData?.value) {
                    error = true;
                    if(fieldKey === 'tncCompanyName' || fieldKey === 'tncName') {
                        newFormData[fieldKey].error = true;
                    }
                }
                else {
                    data[fieldKey] = fieldData.value;
                }
            })
        }
        if(error) setFormData(newFormData);
        return {error, data};
    }

    function checkDisabled() {
        if(!formData?.tncCompanyName?.value || !formData?.tncName?.value || !formData?.sellerEngagementTncConsent?.value || !formData?.sellerFeesTncConsent?.value) {
            return true
        }
    }
    return (
        <Modal
            open={true}
            onClose={handleClose}
        >
            <div className='global-modal-container'>
                <Box sx={compStyle}>
                    <div className='flex flex-direction-coloum row-gap-20'>
                        <div className='flex col-gap-20 align-center'>
                            {
                                !isMobileView() &&
                                <div className='seller-approval-icon success flex justify-center items-center'>
                                    {whiteTickIcon}
                                </div>
                            }
                            <div className={isMobileView() ? 'text-18' : 'text-22'} >Engagement Letter</div>
                        </div>
                        {
                            !isMobileView() &&
                            <div className='text-16 font-300'>Scroll down to view the Engagement Letter and unlock access to potential buyers.</div>
                        }
                    </div>
                    <div className='el-modal-pdf-wrapper'>
                        <PdfviewComponent tncDocument={`data:application/pdf;base64,${enagagementLetterPDF?.content}`} canDownload={true} fileName={enagagementLetterPDF?.fileName} bottomComponent={renderComponent} />
                    </div>
                    <div className='flex col-gap-8 justify-end'>
                        <GenericButton className="text-30 capitalize" onClick={() => handleClose()} sx={{fontWeight: 400, padding: '11px 34px', border: '1px solid #B5B5B5', color: '#fff'}}>Cancel</GenericButton>
                        {
                            canEdit &&
                            <GenericButton className={"button capitalize " + (checkDisabled() ? 'disabled-button' : '')}  color='modalButton' onClick={() => handleVerify()} variant="contained" sx={{fontWeight: 400, padding: '11px 34px'}}>Confirm</GenericButton>
                        }
                    </div>
                </Box>
            </div>
        </Modal>
    )
}

export default ElModal;