import React, { useEffect, useState } from 'react';
import ModalWrapper from '../../ModalWrapper';
import { newCheckedIcon, newUnCheckedIcon, whiteTickIcon } from '../../assets/icons/svgIcons';
import { Button, FormControlLabel, FormGroup, Stack, SvgIcon } from '@mui/material';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { Objectives } from '../../Container/SellerOnboarding/SellerOnboardingSchemas';
import CustomSelect from '../../CommonComponent/CustomSelect';
import { GenericButton, OutlineButton } from '../../CommonComponent/CustomButton';
import CustomCheckbox from '../../CommonComponent/CustomCheckbox';
import { API_SUCCESS_CODE } from '../../constants';
import { useDispatch } from 'react-redux';
import { isObjectEmpty } from '../../helper/commonHelper';
import CustomRadio from '../../CommonComponent/CustomRadio';
import SellerFundRaisingBlueIcon from '../../assets/images/sellerFundRaisingBlueIcon.svg';

const Styles = {
    maxWidth: 500,
    width: '100%',
    bgcolor: '#353535',
    borderRadius: '10px',
    // border: '1px solid #353535',
    outline: 'none',
    color: '#fff',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    p: 4,
    overflowY: 'auto',
    maxHeight: '90vh'
}

function SellerObjectiveModal({companyData, handleClose, handleSubmit}) {
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedCheckboxValue, setSelectedCheckboxValue] = useState('');
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(!isObjectEmpty(companyData)) {
    //         setSelectedCheckboxValue(companyData?.openToOtherObjective);
    //         setSelectedValue(companyData?.objective);
    //     }
        
    // }, [companyData])

    const handleSelectChange = (selectedList) => {
        setSelectedValue(selectedList?.optionValue);
        setSelectedCheckboxValue(false);
    }

    const onClose = () => {
        handleClose();
    }

    const handleSave = () => {
        if(!selectedCheckboxValue) return;
        let payload = {
                "openToOtherObjective": selectedCheckboxValue === 'yes' ? true : false,
            }
        handleSubmit(payload);
    }

    function handleSaveCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {

        }
        else {

        }
    }

    function renderCheckboxLabel() {
        if(selectedValue) {
            return selectedValue === 'acquisition' ? 'Are you open to funding as well ?' : 'Are you open to inbound interest from strategic acquirers ?'
        }
        return false
    }

    function handleChange(e) {
        setSelectedCheckboxValue(e.target.value);
    }

    return (
        <div className='flex flex-direction-coloum row-gap-16'>
            <div>
                {/* <CustomSelect
                    className="rounded-12"
                    parentClass={' primary-theme padding-y4 '}
                    themeBasedParentClass=' primary-theme rounded-8 '
                    options={Objectives}
                    handleSelect={handleSelectChange}
                    label={selectedValue || 'Please select a objective'}
                    size="small"
                    theme="dark"
                    keyToCompare = 'optionValue'
                    displayKey = 'optionText'
                    filterBodyClass='dark-theme'
                /> */}
                {/* {
                    selectedValue &&
                    <div className='margin-t5'>
                        <FormControlLabel className='text-12' 
                            sx={{'& .MuiTypography-root': {fontSize: '14px'}}} 
                            control={<CustomCheckbox 
                                        // sx={{padding: 0, '& .MuiSvgIcon-root': { padding: 0 } }} 
                                        checked={selectedCheckboxValue} 
                                        onChange={(e) => setSelectedCheckboxValue(!selectedCheckboxValue)} 
                                        uncheckedIcon={newUnCheckedIcon}
                                        checkedIcon={newCheckedIcon}
                                    />} 
                            label={renderCheckboxLabel()} labelPlacement="end"
                        />
                    </div>
                } */}

                <Stack direction={'column'} rowGap={1}>
                    <FormGroup className=''>
                        <FormControlLabel className='padding-x12 padding-y5 bg-282828 rounded-8' sx={{marginLeft: 0, marginRight: 0}} control={<CustomRadio checked={selectedCheckboxValue === 'yes'} size="small" sx={{ color: '#fff', '&.Mui-checked': { color: '#3247FF' } }} onChange={(e) => handleChange(e)} value={'yes'} />} label={'Yes'} labelPlacement="end" />
                    </FormGroup>
                    <FormGroup className=''>
                        <FormControlLabel className='padding-x12 padding-y5 bg-282828 rounded-8' sx={{marginLeft: 0, marginRight: 0}} control={<CustomRadio checked={selectedCheckboxValue === 'no'} size="small" sx={{ color: '#fff', '&.Mui-checked': { color: '#3247FF' } }} onChange={(e) => handleChange(e)} value={'no'} />} label={'No'} labelPlacement="end" />
                    </FormGroup>
                </Stack>
            </div>
            {
                selectedCheckboxValue === 'yes' &&
                <div className='padding-y12 padding-x10 font-300 border border-667085 rounded-8'>We have updated our terms and conditions for companies looking for funding. Please sign the updated EL</div>
            }
            <div className='modal-action-container flex col-gap-10 justify-end'>
                <Stack
                  direction={"row"}
                  columnGap={1}
                  justifyContent={"flex-end"}
                >
                  <OutlineButton
                    className="text-30 capitalize"
                    sx={{ fontWeight: 400, padding: "11px 34px" }}
                    onClick={() => onClose()}
                  >
                    Cancel
                  </OutlineButton>
                  <GenericButton
                    className={"button capitalize " + (selectedCheckboxValue ? '' : 'disabled')}
                    sx={{ fontWeight: 400, padding: "11px 34px" }}
                    color="modalButton"
                    onClick={() => handleSave()}
                    variant="contained"
                  >
                    {'Save'}
                  </GenericButton>
                </Stack>
            </div>
        </div>
    )
}

export default ModalWrapper(SellerObjectiveModal, 'Are you Fundraising?', SellerFundRaisingBlueIcon, Styles);