import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Stack } from '@mui/material';
import { deepClone, emailIsValid, isMobileView, isObjectEmpty, isPhoneNumberValid, numbersOnly } from '../../helper/commonHelper';
import { useDispatch } from 'react-redux';
import { updateContactInfo } from '../../Redux/slice/ValuationSlice';
import CustomTextArea from '../../CommonComponent/TextArea';
import { isAdminUser, isSellerUser } from '../../Services';
import { whiteTickIcon } from '../../assets/icons/svgIcons';
import { GenericButton } from '../../CommonComponent/CustomButton';
import CopyLinkIconWhite from '../../assets/images/copyIconWhite.svg'
import { updateSnackbar } from '../../Redux/slice/CommonSlice';
import { trackEvent } from '../../helper/posthogHelper';
import { SELLER_CLICKED_EDIT_CONTACT_INFO, SELLER_CONTACT_INFO_SAVE_SUCCESS } from '../../constants/posthogEvents';

const style = {
    maxWidth: 500,
    width: '100%',
    bgcolor: '#121212',
    borderRadius: '10px',
    border: '1px solid #353535',
    outline: 'none',
    color: '#fff',
    p: 4,
  };

  const initialModel = {
    "firstName": {
        required: true,
        error: false,
        helperText: 'Please enter a valid first name',
    },
    "lastName": {
        required: true,
        error: false,
        helperText: 'Please enter a valid last name'
    },
    "officialEmail": {
        required: false,
        helperText: 'Please enter a valid official email'
    },
    "phone": {
        required: true,
        error: false,
        helperText: 'Please enter a valid 10-digit phone number',
    }
  }

function ContactInformationCard({className, contactInfo, getContactInfo}) {
    const [formData, setFormData] = useState(contactInfo);
    const [fieldModel, setFieldModel] = useState(initialModel);
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);

    useEffect(() => {
        setFormData(contactInfo);
    }, [contactInfo])

    useEffect(() => {
        if(isSellerUser()) {
            if(Object.keys(contactInfo).length && !(contactInfo?.firstName && contactInfo?.phone)) {
                // setShowEditInfoModal(true);
            }           
        }

    }, [contactInfo])

    function handleEditForm() {
        trackEvent(SELLER_CLICKED_EDIT_CONTACT_INFO);
        setShowEditModal(true);
    }

    function handleLinkCopySellerContactInfo(value,snackbarMessage) {
        if (navigator.clipboard) {
          if (value) {
            navigator.clipboard.writeText(value)
              .then(() => {
                dispatch(updateSnackbar({
                  message: snackbarMessage,
                  isOpen: true,
                }));
              })
              .catch(() => {
                dispatch(updateSnackbar({
                  message: 'Please try again',
                  isOpen: true,
                }));
              });
          }
        }
      }
      

    function handleChange(e, key) {
        let newFormData = deepClone(formData), newFieldModel = deepClone(fieldModel), value = e.target.value;
        if(key === 'phone') {
            if(value !== 0 && value !== '') {
                if(!numbersOnly(value)) {
                    return;
                } 
            }
        }
        newFormData[key] = value;
        if(newFieldModel[key]?.error) {
            newFieldModel[key].error = false;
            setFieldModel(newFieldModel);
        }
        setFormData(newFormData);
    }

    function handleClose() {
        if(!(contactInfo?.firstName && contactInfo.phone)) return;
        setFormData(contactInfo);
        setShowEditModal(false);
    }

    function handleConfirmClick() {
        if(!validateData()) {
            let dataToSend = {
                postBody: formData,
                callback: handleCallback
            }
            dispatch(updateContactInfo(dataToSend));
        }
    }

    function handleCallback(res) {
        if(res.status === '200') {
            getContactInfo();
            setShowEditModal(false);
            trackEvent(SELLER_CONTACT_INFO_SAVE_SUCCESS);
        }
        else {
            if(res?.data?.message) {
                alert(res.data.message);
            }
        }
    }
    
    function validateData() {
        let error = false, newFieldModel = deepClone(fieldModel);

        Object.keys(newFieldModel).forEach((fieldKey) => {
            let fieldValue = newFieldModel[fieldKey];
            if(fieldKey === 'phone') {
                if(!isPhoneNumberValid(formData[fieldKey] || '')) {
                    error = true;
                    newFieldModel[fieldKey].error = true;
                }
            }
            else if(fieldKey === 'officialEmail') {
                if(formData[fieldKey]) {
                    if(!emailIsValid(formData[fieldKey] || '')) {
                        error = true;
                        newFieldModel[fieldKey].error = true;
                    }
                }
            }
            else if(fieldValue.required && !formData[fieldKey]) {
                error = true;
                newFieldModel[fieldKey].error = true;
            }
        })

        setFieldModel(newFieldModel);
        return error;
    }

    function getFieldDetails(key, field_name) {
        return fieldModel[key][field_name];
    }

    function handleUpdateInfoModal() {
        setShowEditInfoModal(false)
        setShowEditModal(true);
    }

  return (
    <div className={'upcoming-feature-section ' + (className ? className : '')}>
      <div className='flex justify-space-between padding-x20 padding-b15 border-b border-282828'>
        <div className='text-24'>Contact Information</div>
        {
            !isAdminUser() &&
            <div className='cursor-pointer' onClick={handleEditForm}>
                <span className='upcoming-feature-chip'>Edit</span>
            </div>
        }
      </div>
      <div className='padding-x20 margin-b10 padding-t20 '>
        <div className='margin-b25' >
            <div className='flex align-center justify-space-between margin-b5'>
                <span className='text-22 font-500'>Name</span>
            </div>
            <p className='margin-0 font-300 text-14 text-FFFEFE'>
                {`${contactInfo?.firstName || ''} ${contactInfo?.lastName || ''}`}
            </p>
        </div>
        <div className='margin-b25' >
            <div className='flex align-center justify-space-between margin-b5'>
                <span className='text-22 font-500'>Phone Number</span>
            </div>
            <p className='margin-0 font-300 text-14 text-FFFEFE relative'>
            {contactInfo?.phone || 'Add your phone number for direct contact'}
            {
                isAdminUser() &&
                <img src={CopyLinkIconWhite} alt="copy to clipboard" className='copyIconWhite' onClick={() => handleLinkCopySellerContactInfo(contactInfo?.phone, 'Phone Number copied to clipboard')}/>
            }
            
            </p>
        </div>
        {
            !isObjectEmpty(contactInfo) && !contactInfo?.officialSignup &&
            <div className='margin-b25' >
                <div className='flex align-center justify-space-between margin-b5'>
                    <span className='text-22 font-500'>Official Email ID</span>
                </div>
                <p className='margin-0 font-300 text-14 text-FFFEFE relative'>
                    {contactInfo?.officialEmail || 'Add your email to receive important updates'}
                    {
                        isAdminUser() && contactInfo?.officialEmail &&
                        <img src={CopyLinkIconWhite} alt="copy to clipboard" className='copyIconWhite' onClick={() => handleLinkCopySellerContactInfo(contactInfo?.officialEmail, 'Email copied to clipboard')} />
                    }
                    
                </p>
            </div>
        }
        <div className='margin-b25' >
            <div className='flex align-center justify-space-between margin-b5'>
                <span className='text-22 font-500'>Registered Email ID</span>
            </div>
            <p className='margin-0 font-300 text-14 text-FFFEFE relative'>
                        {`${contactInfo?.email || ''}`}
                   {isAdminUser() && <img src={CopyLinkIconWhite} alt="copy to clipboard" className='copyIconWhite' onClick={() => handleLinkCopySellerContactInfo(contactInfo?.email,'Email copied to clipboard')} />}
            </p>
            
        </div>
      </div>
      {
        showEditModal &&
        <Modal
            open={showEditModal}
            sx={{ zIndex: 1001 }}
            onClose={() => {}}>
            <div className='global-modal-container'>
                <Box sx={style}>
                <div className='global-modal-header text-18 text-white margin-b15'>Contact Information</div>
                <div className={'flex col-gap-10 margin-b15 ' + (isMobileView() ? 'flex-direction-coloum row-gap-15' : '')}>
                    <div className='flex-1'>
                        <div className="text-B5B5B5 margin-b8">First Name <span className='text-danger'>{` *`}</span></div>
                        <CustomTextArea 
                            size="small"
                            fullWidth
                            value={formData?.firstName || ''} 
                            onChange={e => handleChange(e, 'firstName')}
                            error={getFieldDetails('firstName', 'error') ? true : false}
                            placeholder={getFieldDetails('firstName', 'placeholder')}
                            helperText={getFieldDetails('firstName', 'error') ? getFieldDetails('firstName', 'helperText') : ''}
                        />
                    </div>
                    <div className='flex-1'>
                        <div className="text-B5B5B5 margin-b8">Last Name <span className='text-danger'>{` *`}</span></div>
                        <CustomTextArea 
                            fullWidth
                            size="small"
                            value={formData?.lastName || ''} 
                            onChange={e => handleChange(e, 'lastName')}
                            error={getFieldDetails('lastName', 'error') ? true : false}
                            placeholder={getFieldDetails('lastName', 'placeholder')}
                            helperText={getFieldDetails('lastName', 'error') ? getFieldDetails('lastName', 'helperText') : ''}
                        />
                    </div>
                </div>
                <div className='margin-b15'>
                    <div className="text-B5B5B5 margin-b8">Phone Number <span className='text-danger'>{` *`}</span></div>
                    <CustomTextArea 
                        fullWidth
                        size="small"
                        value={formData?.phone || ''} 
                        onChange={e => handleChange(e, 'phone')}
                        error={getFieldDetails('phone', 'error') ? true : false}
                        autoComplete='off'
                        inputProps={{ maxLength: 10 }}
                        placeholder={getFieldDetails('phone', 'placeholder')}
                        helperText={getFieldDetails('phone', 'error') ? getFieldDetails('phone', 'helperText') : ''}
                    />
                </div>
                {
                    !isObjectEmpty(contactInfo) && !contactInfo?.officialSignup &&
                    <div className=' margin-b15'>
                        <div className="text-B5B5B5 margin-b8">Official Email ID</div>
                        <CustomTextArea 
                            fullWidth
                            size="small"
                            value={formData?.officialEmail || ''} 
                            onChange={e => handleChange(e, 'officialEmail')}
                            error={getFieldDetails('officialEmail', 'error') ? true : false}
                            placeholder={getFieldDetails('officialEmail', 'placeholder')}
                            helperText={getFieldDetails('officialEmail', 'error') ? getFieldDetails('officialEmail', 'helperText') : ''}
                        />
                    </div>
                }
                <div className=" margin-b15">
                    <div className="text-B5B5B5 margin-b8">Registered Email ID</div>
                    <CustomTextArea
                        fullWidth
                        size="small"
                        value={contactInfo?.email || ""}
                        disabled={true}
                        placeholder={'Registered Email ID'}
                    />
                </div>
                <div className='margin-t20 flex col-gap-10' style={{justifyContent: 'flex-end'}}>
                    {
                        contactInfo?.phone &&
                        <Button size="large" sx={{background: '#282828', color: '#fff', border: '1px solid #353535', '&:hover': {background: '#282828'}, flex: 1}} className={'capitalize ' + (!(contactInfo?.firstName && contactInfo.phone) ? 'disabled-button' : '')} variant='contained' onClick={handleClose}>Cancel</Button>
                    }
                    <Button size="large" sx={{background: '#1570EF', color: '#fff', border: '1px solid #353535', '&:hover': {background: '#1570EF'}, flex: 1}} className='capitalize' variant='contained' onClick={handleConfirmClick}>Confirm</Button>
                </div>
                </Box>
            </div>
        </Modal>
      }
      {
        showEditInfoModal &&
        <Modal
            open={showEditInfoModal}
            onClose={() => {}}
        >
            <div className='global-modal-container'>
                <Box sx={style}>
                    <div className='flex row-gap-20 flex-direction-coloum margin-b20'>
                        <div className='flex col-gap-20 align-center'>
                            <div className='icon-box rounded-full'>
                                {whiteTickIcon}
                            </div>
                            <div className={'text-22'}>Update your contact info</div>
                        </div>
                        <div className={'text-16 font-300 ' + (isMobileView() ? 'text-14' : 'text-16')}>Please update your contact information so that our business team can reach out to you.</div>
                    </div> 
                    <Stack direction={'row'} columnGap={1} justifyContent={'flex-end'}>
                        <GenericButton fullWidth className="capitalize" color='modalButton' onClick={handleUpdateInfoModal} variant="contained" sx={{fontWeight: 400, padding: '11px 34px'}}>Update Contact Information</GenericButton>
                    </Stack>
                </Box>
            </div>
        </Modal>
      }
    </div>
  )
}

export default ContactInformationCard;