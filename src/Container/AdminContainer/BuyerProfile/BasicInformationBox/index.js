import React, { useRef, useState } from 'react';
import TitleBox from '../../../../Component/TitleBox';
import { Button, Chip, InputAdornment, MenuItem, Select, Slider, TextField } from '@mui/material';
import PencilIcon from '../../../../assets/images/pencilIcon.svg';
import CopyLinkIcon from '../../../../assets/images/copyIcon.svg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import './style.scss';
import CustomSelect from '../../../../CommonComponent/CustomSelect';
import { BuyerTypeArr } from '../../../../CommonModels/CommonCollection';
import SaveIcon from '../../../../assets/images/saveIcon.svg';
import { deepClone, getFieldLabelData, isAlphabetOnly, isMobileView, isPhoneNumberValid } from '../../../../helper/commonHelper';
import NewTextField from '../../../../CommonComponent/NewTextField';
import { isAdminUser } from '../../../../Services';
import { updateSnackbar } from '../../../../Redux/slice/CommonSlice';
import { useDispatch } from 'react-redux';
import CustomCheckboxIcon from '../../../../CommonComponent/CustomCheckboxIcon';
import CustomRadioGroup from '../../../../CommonComponent/CustomRadioGroup';
import { CORPORATE_KEY, CORPORATE_VC_KEY, FAMILY_OFFICE_KEY, VC_PE_KEY } from '../../../../constants/keyVariableConstants';


const validFormFields = {
    "phone" : {
      error: false,
      helperText: 'Please input your 10-digit number only.',
      placeholder: 'Enter your phone number',
      required: true
    },
    "pocName": {
      error: false,
      helperText: 'Please fill in',
      placeholder: 'Enter your full name',
      required: true
    },
    "companyName": {
      error: false,
      helperText: 'Please fill in',
      placeholder: 'Enter company’s name',
      required: true
    },
    "website": {
      placeholder: 'www.example.com'
    },
    "pocLinkedin": {
      placeholder: 'www.linkedin.com/in/username'
    },
    "description": {
        placeholder: 'Buyer is a major edtech-platform that offers industry relevant degree and non-degree programs to aspiring students to upskill and advance their career',

    }
  }

function BasicInformationBox({formData, handleFormField, handleSaveAction, handleSelect, errorCta}) {
    const [isEditable, setIsEditable] = useState(false);
    const [fieldError , setFieldError] = useState(validFormFields);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    function handleOnClick() {
        if(isEditable) {
            if(hasValidationError()) return;
            handleSaveAction();
            setTimeout(() => {
                setIsEditable(false)
            }, 200);
        }
        else setIsEditable(true);
    }

      function handleLinkCopy() {
        if (navigator.clipboard){
            const emailToCopy = formData?.email || '';
            if (emailToCopy) {
                navigator.clipboard.writeText(emailToCopy)
                .then(() => {
                    dispatch(updateSnackbar({
                        message: "Email address copied to clipboard",
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
    }

    function hasValidationError() {
        let error = false, newfieldError = deepClone(fieldError);
        Object.keys(newfieldError).forEach((keyname) => {
          if(newfieldError[keyname].required && !formData?.[keyname]) {
            error = true;
            newfieldError[keyname].error = true;
            if(keyname === 'pocName') newfieldError[keyname].helperText = 'Please fill in';
            return;
          }
          if(keyname === 'phone') {
            if(!isPhoneNumberValid(formData?.['phone'])) {
              error = true;
              newfieldError[keyname].error = true;
              return;
            }
          }
          if(keyname === 'pocName') {
            if(!(isAlphabetOnly(formData?.[keyname]))) {
                error = true;
                newfieldError[keyname].error = true;
                newfieldError[keyname].helperText = 'No special character allowed';
                return;
            }
          }

          newfieldError[keyname].error = false;
        })
        setFieldError(newfieldError);
        return error;
      }

      function showOpenToLead() {
        return (formData?.type === FAMILY_OFFICE_KEY && !!formData?.openToFunding) ||
               (formData?.type === CORPORATE_VC_KEY || formData?.type === VC_PE_KEY);
     }

     function isPrefActive(){
        if(formData?.type ===  FAMILY_OFFICE_KEY){
            return true;
        }else{
            return false;
        }
     }

     function showAcquisition(){
      if(formData?.type === FAMILY_OFFICE_KEY){
        return formData?.openToAcquisition;
      }else if(formData?.type === CORPORATE_KEY){
        return true;
      }else{
        return false;
      }
     }

     function showFundraising(){
        if(formData?.type === FAMILY_OFFICE_KEY){
          return formData?.openToFunding;
        }else if(formData?.type === CORPORATE_KEY){
          return false;
        }else{
          return true;
        }
       }

       function handleAcquisition(){
        if(!formData?.openToFunding && formData?.openToAcquisition){
          return;
        }else{
          handleFormField(!formData?.openToAcquisition, 'openToAcquisition')
        }
       }

       function handleFundRaising(){
        if(formData?.openToFunding && !formData?.openToAcquisition){
          return;
        }else{
          handleFormField(!formData?.openToFunding, 'openToFunding')
        }
       }
    

    return (
        <div className='basic-information-container'>
            <div className='flex justify-space-between align-center basic-information-header padding-b30 col-gap-20 padding-l10'>
                <TitleBox title="Basic Information" desc="Enter essential details to complete your user profile." descClassName="maxWidth-420 text-667085 text-14 margin-t0 margin-b0" className="text-18 font-500 margin-t0 margin-b10" />
                {
                    !isMobileView() &&
                    <Button className='capitalize' 
                        size="small" 
                        variant="outlined" 
                        sx={{color: '#000', borderRadius: '8px', minWidth: '139px', border: errorCta ? '1px solid #B42318' : '1px solid #D0D5DD', boxShadow: '0px 1px 2px 0px #1018280D', height: '36px', padding: '3px 20px'}} 
                        startIcon={isEditable ? <img src={SaveIcon} alt="" /> : <img src={PencilIcon} alt="" />} 
                        onClick={handleOnClick}
                    >
                        {isEditable ? 'Save Changes' : 'Edit Section'}
                    </Button>
                }
            </div>
            <div className='margin-b30 padding-l12 padding-r12'>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>Full Name</div>
                    <div className='flex-1'>
                        <NewTextField 
                            size="small" 
                            value={formData?.pocName || ''} 
                            fullWidth variant="outlined" 
                            disabled={!isEditable} 
                            onChange={(e) => handleFormField(e.target.value, 'pocName')}
                            placeholder={getFieldLabelData(fieldError, 'pocName', 'placeholder')}
                            error={!!getFieldLabelData(fieldError, 'pocName', 'error')}
                            helperText={getFieldLabelData(fieldError, 'pocName', 'error') ? getFieldLabelData(fieldError, 'pocName', 'helperText') : ''}
                        />
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>Company Name</div>
                    <div  className='flex-1'>
                        <NewTextField 
                            size="small" value={formData?.companyName || ''} 
                            fullWidth 
                            variant="outlined" 
                            disabled={((isAdminUser() || formData?.primaryMember) ? !isEditable : true)}  
                            onChange={(e) => handleFormField(e.target.value, 'companyName')} 
                            placeholder={getFieldLabelData(fieldError, 'companyName', 'placeholder')}
                            error={!!getFieldLabelData(fieldError, 'companyName', 'error')}
                            helperText={getFieldLabelData(fieldError, 'companyName', 'error') ? getFieldLabelData(fieldError, 'companyName', 'helperText') : ''}
                        />
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>Company Website</div>
                    <div className='flex-1'>
                        <NewTextField 
                            InputProps={{
                                startAdornment: <InputAdornment position="start" sx={{ root: {color: '#fff', zIndex: 2}}}>
                                    https://
                                </InputAdornment>,
                            }}
                            size="small" 
                            value={formData?.website || ''}
                            fullWidth 
                            disabled={!isEditable}
                            variant="outlined" 
                            onChange={(e) => handleFormField(e.target.value, 'website')}
                            placeholder={getFieldLabelData(fieldError, 'website', 'placeholder')}
                        />
                    </div>
                </div>
                <div className={`flex form-label-border ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center '}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>Your LinkedIn URL</div>
                    <div className='flex-1'>
                        <NewTextField 
                            InputProps={{
                                startAdornment: <InputAdornment position="start" sx={{ root: {color: '#fff', zIndex: 2}}}>
                                    https://
                                </InputAdornment>,
                            }}
                            size="small" 
                            value={formData?.pocLinkedin || ''}
                            fullWidth 
                            variant="outlined"
                            disabled={!isEditable}
                            onChange={(e) => handleFormField(e.target.value, 'pocLinkedin')} 
                            placeholder={getFieldLabelData(fieldError, 'pocLinkedin', 'placeholder')}
                        />
                    </div>
                </div>
                <div className={`flex form-label-border ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center '}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>Buyer Type</div>
                    <div className='flex-1'>
                        <CustomSelect 
                            className="rounded-8"
                            parentClass={'bg-white text-101828 border border-D0D5DD'}
                            value={formData?.type || ''}
                            placeholder="Select Type"
                            label={formData?.type || 'Select'} 
                            options={BuyerTypeArr} 
                            handleSelect={(valueObj) => handleFormField(valueObj.key, 'type')}
                            disable={true}
                        />
                    </div>
                </div>
                <div className={`flex form-label-border ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center '}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Phone Number</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s phone number</div> */}
                    </div>
                    <div className='flex-1'>
                        <NewTextField
                            size="small" 
                            value={formData?.phone || ''}
                            fullWidth 
                            inputProps={{ maxLength: 10,
                                startAdornment:
                                    <InputAdornment position="start">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                            }}
                            variant="outlined" 
                            onChange={(e) => handleFormField(e.target.value, 'phone')}
                            disabled={!isEditable}
                            placeholder={getFieldLabelData(fieldError, 'phone', 'placeholder')}
                            error={!!getFieldLabelData(fieldError, 'phone', 'error')}
                            helperText={getFieldLabelData(fieldError, 'phone', 'error') ? getFieldLabelData(fieldError, 'phone', 'helperText') : ''}
                        />
                    </div>
                </div>
                <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                    <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                        <div>Official Email Address</div>
                        {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email Address </div> */}
                    </div>
                    <div className='flex-1 relative'>
                        <NewTextField  
                            inputProps={{
                                startAdornment:
                                <InputAdornment position="start">
                                    <LocalPhoneOutlinedIcon />
                                </InputAdornment>
                            }}
                            value={formData?.email || ''}
                            size="small" 
                            fullWidth 
                            variant="outlined" 
                            onChange={(e) => {}}
                            disabled={true}
                            inputRef={inputRef}
                        />
                        {
                            isAdminUser() && 
                            <div className='icon-container icon-position' onClick={() => handleLinkCopy()}>
                                     <img src={CopyLinkIcon} alt="copy to clipboard" />
                             </div>
                        }
                       
                    </div>
                  
                </div>
                {
                    isAdminUser() &&
                    <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                        <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                            <div>Buyer Anonymous Description</div>
                            <div className='text-667085 text-14'>This will be visible to potential sellers and dealmakers</div>
                        </div>
                        <div className='flex-1'>
                            <NewTextField
                                size="small" 
                                value={formData?.description || ''}
                                fullWidth 
                                variant="outlined" 
                                onChange={(e) => handleFormField(e.target.value, 'description')}
                                disabled={!isEditable}
                                placeholder={getFieldLabelData(fieldError, 'description', 'placeholder')}
                                multiline={true}
                                minRows={getFieldLabelData(fieldError, 'description', 'minRow') || 3}
                                maxRows={getFieldLabelData(fieldError, 'description', 'maxRow') || 5}
                            />
                        </div>
                    </div>
                }
                        <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                        <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                            <div>Investment Preference</div>
                        </div>
                        <div className='flex-1'>
                       {(isEditable && isPrefActive() && !!formData?.primaryMember) ? 
                       <div className='flex'>
     
                     {(formData?.type === FAMILY_OFFICE_KEY ? true : showAcquisition()) && <div className={`cursor-pointer text-14 text-344054 font-500 flex`} onClick={handleAcquisition}>
                      <CustomCheckboxIcon isActive={formData?.openToAcquisition} />
                      <span>Acquisition</span> 
                      </div> }

                     {(formData?.type === FAMILY_OFFICE_KEY ? true : showFundraising()) && <div className={`cursor-pointer text-14 text-344054 font-500 flex ml-5`} onClick={handleFundRaising}>
                      <CustomCheckboxIcon isActive={formData?.openToFunding} />
                      <span>Fundraising</span> 
                      </div> }
                      
                      </div>
                       :
                      <div>

                      {showAcquisition() && <Chip
                       label='Acquisition'
                       className='text-12 font-500'
                       sx={{ background: '#F9F5FF', color: '#6941C6', marginRight: '10px' }}
                       /> }

                      {showFundraising() && <Chip
                       label='Fundraising'
                       className='text-12 font-500'
                       sx={{ background: '#F9F5FF', color: '#6941C6', marginRight: '10px' }}
                       /> }
                       
                      </div> }
                        </div>
                    </div>
                   {showOpenToLead() && <div className={`flex form-label-border  ${isMobileView() ? 'col-gap-15 flex-direction-coloum form-label-border-mobile' : 'align-center'}`}>
                        <div className={`form-label ${isMobileView() ? 'margin-b10':'width-40 '}`}>
                            <div>Open to Leading a Round?</div>
                        </div>
                        <div className='flex-1'>
                       {(isEditable && !!formData?.primaryMember) ? 
                          <div className='flex col-gap-10 align-flex-start w-full'>
                          <CustomRadioGroup 
                              handleChange={(value) => handleFormField(value === 'true' ? true : false , 'openToLeadRound')} 
                              selectedValue={formData?.['openToLeadRound'] ? 'true' : 'false'}
                              error={!!getFieldLabelData(formData, 'openToLeadRound', 'error')}
                              options={[{key: true, value:'Yes'}, {key: false, value: 'No'}]}
                              helperText={getFieldLabelData(formData, 'openToLeadRound', 'error') ? getFieldLabelData(formData, 'openToLeadRound', 'helperText') : ''}
                              radioProps={{
                                  size: "small",
                                //   disabled: validateUser()
                              }}
                          />
                      </div>
                       : <div>
                             <Chip
                                label={formData?.['openToLeadRound'] ? 'Yes' : 'No'}
                                className='text-12 font-500'
                                sx={{background: '#ECFDF3', color: '#027A48' , marginRight: '10px'}}
                                 />            
                        </div> }
                        </div>
                    </div> }
            </div>
        </div>
    )
}

export default BasicInformationBox;