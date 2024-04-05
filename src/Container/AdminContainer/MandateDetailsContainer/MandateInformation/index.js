import React, { useEffect, useState } from 'react';
import TitleBox from '../../../../Component/TitleBox';
import { Button, Checkbox, Chip, FormControlLabel } from '@mui/material';
import { AcquisitionSizeArr, CompanySectorArr, OperationArr, SubsectorMapping } from '../../../../CommonModels/CommonCollection';
import { deepClone, getFieldLabelData, getValueFromArr, isMobileView } from '../../../../helper/commonHelper';
import { API_SUCCESS_CODE, PUT, RUPEE_SYMBOL } from '../../../../constants';
import { isEditable } from '@testing-library/user-event/dist/utils';
import SaveIcon from '../../../../assets/images/saveIcon.svg'
import PencilIcon from '../../../../assets/images/pencilIcon.svg'
import CustomSelect from '../../../../CommonComponent/CustomSelect';
import CustomRangeSlider from '../../../../CommonComponent/CustomRangeSlider';
import { AdminBuyerMandateModelNew } from '../../BuyerProfile/BuyerProfileTableModel';
import NewTextField from '../../../../CommonComponent/NewTextField';
import { CrossIcon } from '../../../../assets/icons';
import { updateFormToServer } from '../../../../Redux/slice/CommonSlice';
import { ENDPOINT } from '../../../../config/endpoint';
import { useDispatch } from 'react-redux';
import { isAdminUser, isBuyerUser } from '../../../../Services';

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
      placeholder: 'Enter company’s website'
    },
    "pocLinkedin": {
      placeholder: 'Enter company’s linkedin'
    }
  }

function MandateInformation({formData={},handleFormField,handleSaveAction,selectedValue=[0, 10], onChange, minRange = 0, maxRange = 100, step=1,disabled}) {
    const [fieldError , setFieldError] = useState(validFormFields);
    // const [rangeSelector, setRangeSelector] = useState(datalist);
    const [mandateModel, setMandateModel] = useState(AdminBuyerMandateModelNew());
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [dealInputValue, setDealInputValue] = useState("");
    const dispatch = useDispatch();
    const [errorCta, setErrorCta] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
   

    useEffect(()=>{
        if(Object.keys(formData).length){
            let newFormData = deepClone(mandateModel);
            newFormData['id'].value = formData?.id;
            newFormData['name'].value = formData?.name;
            newFormData['uid'].value = formData?.uid;
            newFormData['buyerid'].value = formData?.buyerid;
            newFormData['preferences'][0]['id'] = formData?.preferences[0].id || "";
            newFormData['preferences'][0]['sector'].value = formData?.preferences[0].sector;
            newFormData['preferences'][0]['subsector'].value = formData?.preferences[0].subsector;
            if(formData?.revenueMin > 0) {
                newFormData['revenueMin'].value = formData?.revenueMin;
            }
            if(formData?.revenueMax > 0) {
                newFormData['revenueMax'].value = formData?.revenueMax;
            }
            setMandateModel(newFormData);
            setIsLoaded(true);
        }
    },[formData])

    function prepareData() {
        let data = {}, error = false, newMandateData = deepClone(mandateModel);
        Object.keys(newMandateData).forEach(keyName => {
            let fieldData = newMandateData[keyName];
            if(keyName === 'preferences') {
                let modifyData = fieldData, preferenceData = [];
                modifyData.forEach((preferenceField, index) => {
                    if(!preferenceField?.sector?.value) {
                        error = true;
                        modifyData[index].sector.error = true;
                        return;                    
                    }
                    else {
                        if(SubsectorMapping[preferenceField?.sector?.value] && !preferenceField?.subsector?.value) {
                            error = true;
                            modifyData[index].subsector.error = true;
                            return;
                        }
                    }
                    preferenceData.push({id: preferenceField.id, sector: preferenceField?.sector?.value, subsector:  preferenceField?.subsector?.value || null});
                })
                if(error) newMandateData.preferences = modifyData;
                if(!error) data[keyName] = 
                data[keyName] = preferenceData;
            }
            else if(keyName === 'targets') {
                data[keyName] = fieldData.value?.join(',') || '';
            }
            else if(keyName === 'revenueMin') {
              data[keyName] = fieldData.value;
            }
            else if(keyName === 'revenueMax') {
              data[keyName] = fieldData.value;
            }

            else {
                if(fieldData.required && !fieldData.value) {
                    error = true;
                    newMandateData[keyName].error = true;
                }
                else {
                    // if(keyName === "ebidta" || keyName === "operational"){
                    //     data[keyName] = fieldData.value;
                    // }else{
                        data[keyName] = fieldData.value || null;
                    // }
                }
            }
        });
        if(error) setMandateModel(newMandateData);
        return {error, data};
    }

    function handleCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            handleSaveAction();
            setTimeout(() => {
                setIsEditable(false);
                // window.location.reload()
            }, 200);
        }
        else {
            setErrorCta(true);
        }
    }

    function handleSave(){
        let {error, data} = prepareData();
        if(error) return;
        setErrorCta(false);
        let dataToSend = {
            postBody: data,
            method: PUT,
            url: ENDPOINT.MANDATES.updateMandate(),
            callback: handleCallback
        };

        dispatch(updateFormToServer(dataToSend));
    }

    function handleOnClick() {
        if(isEditable) {
            handleSave();
        }
        else setIsEditable(true);
    }

    function renderSuggestedCompanies() {
        if(formData?.targets) {
            let targets = formData?.targets.split(',');
            return (
                <div className='flex col-gap-8'>
                    {
                        targets.map((targetList, index) => {
                            return (
                                <Chip
                                    key={targetList + index}
                                    label={targetList}
                                    className='text-12 font-500'
                                    sx={{background: '#EEF4FF', color: '#3538CD'}}
                                />
                            )
                        })
                    }
                </div>
            )
        }
    }
    function handleSectorChange(value, key, index) {
        let preferencesArr = formData?.preferences || [];
        let preferenceObj = preferencesArr?.[index] || {sector: '', subsector: ''};
        preferenceObj[key] = value;
        if(key === 'sector') preferenceObj['subsector'] = '';
        preferencesArr.splice(index, 1, preferenceObj);
        handleFormField(preferencesArr, 'preferences')
    }
    function hanleRangeFiltere(value) {
        if(value && Array.isArray(value) && value?.length) {
            let newFormData = deepClone(mandateModel);
            newFormData['revenueMin'].value = value[0];
            newFormData['revenueMax'].value = value[1];
            setMandateModel(newFormData);
        }
    }

    function hanleRangeDealFilters(value) {
        if(value && Array.isArray(value) && value?.length) {
            let newFormData = deepClone(mandateModel);
            newFormData['dealMin'].value = value[0];
            newFormData['dealMax'].value = value[1];
            setMandateModel(newFormData);
        }
    }

    function handleFieldUpdate(value, key) {
        let newMandateModel = deepClone(mandateModel);
        newMandateModel[key].value = value;
        if(newMandateModel[key].error) newMandateModel[key].error = false;
        setMandateModel(newMandateModel);
    }

    function handleChipInput (event) {
        setInputValue(event.target.value);
    }

    function handleChipKeyUp(event, key) {
        if(event.key === 'Enter') {
          let data = deepClone(mandateModel), newCompanies = data?.targets?.value || [];
            newCompanies.push(event.target.value);
            data.targets.value = newCompanies;
          setMandateModel(data);
          setInputValue('');
        }
    }

    function hadleChipDelete(key, index) {
        let data = deepClone(mandateModel);
        if(data?.targets?.value?.length) {
            data.targets?.value.splice(index, 1);
            setMandateModel(data);
        }
    }

    function renderSectorValue(preferenceList) {
        return `${preferenceList?.sector} ${preferenceList?.subsector ? `> ${preferenceList.subsector}` : ''}`
    }

    return (
      <div className="mandate-information-container">
        <div className="flex justify-space-between align-center border-b border-D0D5DD padding-b30 col-gap-20">
          <TitleBox
            title="Mandate Information"
            desc="This section provides detailed information about the mandate"
            descClassName="maxWidth-420 text-667085 text-14 margin-t0 margin-b0"
            className="text-18 font-500 margin-t0 margin-b10"
          />
          {isAdminUser() && (
            <Button
              className="capitalize"
              size="small"
              variant="outlined"
              sx={{
                color: "#000",
                borderRadius: "8px",
                minWidth: "139px",
                border: errorCta ? "1px solid #B42318" : "1px solid #D0D5DD",
                boxShadow: "0px 1px 2px 0px #1018280D",
                height: "36px",
                padding: "3px 20px",
              }}
              startIcon={
                isEditable ? (
                  <img src={SaveIcon} alt="" />
                ) : (
                  <img src={PencilIcon} alt="" className={`${isBuyerUser() ? 'disabled': ''}`} />
                )
              }
              onClick={handleOnClick}
              disabled={isBuyerUser()}
            >
              {isEditable ? "Save Changes" : "Edit Section"}
              
            </Button>
          )}
        </div>
        {
            isLoaded && 
        <div className="padding-l15 margin-b30 flex flex-direction-coloum row-gap-24 margin-t24">
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Sectors Interested in</div>
              {!isEditable && (
                <div className="text-667085 text-14">
                  Create a mandate if you have a specific M&A requirement
                </div>
              )}
            </div>
            {isEditable ? (
              <div className="flex-1 flex col-gap-10">
                <CustomSelect
                  className="rounded-8"
                  parentClass={"bg-white text-101828 border border-D0D5DD"}
                  label={
                    formData?.preferences
                      ? formData?.preferences[0]?.sector || "Select Sector"
                      : "Select Sector"
                  }
                  options={CompanySectorArr}
                  handleSelect={(valueObj) =>
                    handleSectorChange(valueObj.key, "sector", 0)
                  }
                  rootClass="flex-1"
                />
                <CustomSelect
                  className="rounded-8"
                  parentClass={"bg-white text-101828 border border-D0D5DD"}
                  label={
                    formData?.preferences
                      ? formData?.preferences[0]?.subsector ||
                        "Select Sub-Sector"
                      : "Select Sub-Sector"
                  }
                  options={
                    SubsectorMapping[
                      formData?.preferences
                        ? formData?.preferences[0]?.sector
                        : ""
                    ]
                  }
                  handleSelect={(valueObj) =>
                    handleSectorChange(valueObj.key, "subsector", 0)
                  }
                  rootClass="flex-1"
                />
              </div>
            ) : (
              <div className="flex-1">
                {
                  <div>
                    {formData?.preferences?.length > 0 &&
                      formData.preferences.map((preferenceList, index) => (
                        <Chip
                          key={"preferenceList" + index}
                          label={renderSectorValue(preferenceList)}
                          className="text-12 font-500"
                          sx={{ background: "#F9F5FF", color: "#6941C6" }}
                        />
                      ))}
                  </div>
                }
              </div>
            )}
          </div>
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Revenue Range (₹ crores)</div>
              {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email Address</div> */}
            </div>
            <div className="flex-1">
              <CustomRangeSlider
                rangeSliderValue={[
                  mandateModel?.revenueMin?.value,
                  mandateModel?.revenueMax?.value,
                ]}
                min={0}
                max={50}
                onChange={hanleRangeFiltere}
                step={0.5}
                valueLabelDisplay="on"
                disabled={!isEditable}
              />

              {/* <div className='flex col-gap-12 align-center'>
                            <div className='label-box w-185px'>{`${RUPEE_SYMBOL} ${formData?.revenueMin || 0}`}</div>
                            <div>-</div>
                            <div className='label-box w-185px'>{`${RUPEE_SYMBOL} ${formData?.revenueMax || ''}`}</div>
                        </div> */}
            </div>
          </div>
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>EBITDA Status</div>
            </div>
            {isEditable ? (
              <div className="flex-1">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="EBITDA Positive only"
                  // disabled={!isEditable}
                />
              </div>
            ) : (
              <div className="flex-1">
                <Chip
                  label={
                    formData.ebidta
                      ? "EBITDA Positive companies only"
                      : "Open to all"
                  }
                  className="text-12 font-500"
                  sx={{ background: "#ECFDF3", color: "#027A48" }}
                />
              </div>
            )}
          </div>
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Age of Company</div>
            </div>
            {isEditable ? (
              <div className="flex-1">
                <CustomSelect
                    rootClass={'flex-1'}
                    className="rounded-8"
                    parentClass={'bg-white text-101828 border border-D0D5DD'}
                    options={mandateModel?.operation?.options} 
                    handleSelect={(valueObj) => handleFieldUpdate(valueObj.key, 'operation')}
                    label={getFieldLabelData(mandateModel, 'operation', 'value') || getFieldLabelData(mandateModel, 'operation', 'placeholder')} 
                    error={getFieldLabelData(mandateModel, 'operation', 'error')}
                    errorMessage={getFieldLabelData(mandateModel, 'operation', 'error') ? getFieldLabelData(mandateModel, 'operation', 'helperText') : ''}
                />
              </div>
            ) : (
              <div className="flex-1">
                {formData?.operation && (
                  <Chip
                    label={getValueFromArr(formData?.operation, OperationArr)}
                    className="text-12 font-500"
                    sx={{ background: "#EEF4FF", color: "#3538CD" }}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Operational Status</div>
              {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email number</div> */}
            </div>
            {isEditable ? (
              <div className="flex-1">
                {/* {
                            <Chip
                                label={formData?.operational ? 'Operational' : 'Open to all'}
                                className='text-12 font-500'
                                sx={{background: '#ECFDF3', color: '#027A48'}}
                            />
                        } */}
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Operational companies only"
                />
              </div>
            ): (
              <div className="flex-1">
                {
                  <Chip
                    label={
                      formData?.operational ? "Operational" : "Open to all"
                    }
                    className="text-12 font-500"
                    sx={{ background: "#ECFDF3", color: "#027A48" }}
                  />
                }
              </div>
            ) }
          </div>
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Any Other Criteria</div>
              {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email number</div> */}
            </div>
            {isEditable ? (
              <div className="flex-1">
                <NewTextField
                  className="rounded-8 flex-1"
                  onChange={(e) => handleFieldUpdate(e.target.value, "others")}
                  size="small"
                  fullWidth
                  autoComplete="off"
                  multiline
                  minRows={3}
                  maxRows={3}
                  inputProps={{ maxLength: 240 }}
                  placeholder={getFieldLabelData(
                    mandateModel,
                    "others",
                    "placeholder"
                  )}
                  value={getFieldLabelData(mandateModel, "others", "value")}
                  error={!!getFieldLabelData(mandateModel, "others", "error")}
                  helperText={
                    getFieldLabelData(mandateModel, "others", "error")
                      ? getFieldLabelData(mandateModel, "others", "helperText")
                      : ""
                  }
                />
              </div>
            ) : (
              <div>
                {formData?.others && (
                  <div className="label-box">{formData?.others}</div>
                )}
              </div>
            )}
          </div>
          {/* <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Acquisition Size/ Deal Size Preference (₹ crores)</div>
            </div>
            <div className="flex-1">
              <CustomRangeSlider
                rangeSliderValue={[
                  mandateModel?.dealMin?.value,
                  mandateModel?.dealMax?.value,
                ]}
                min={0}
                max={50}
                onChange={hanleRangeDealFilters}
                step={0.5}
                disableSwap
                disabled={!isEditable}
              />
            </div>
          </div> */}
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Deal Construct</div>
            </div>
            {
                isEditable ? (
                  <div className='width-65'>
              <NewTextField
                // className="rounded-8 "
                onChange={(e) =>
                  handleFieldUpdate(e.target.value, "dealConstruct")
                }
                size="small"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 10 }}
                placeholder={getFieldLabelData(
                  mandateModel,
                  "dealConstruct",
                  "placeholder"
                )}
                value={getFieldLabelData(
                  mandateModel,
                  "dealConstruct",
                  "value"
                )}
                error={
                  !!getFieldLabelData(mandateModel, "dealConstruct", "error")
                }
                helperText={
                  getFieldLabelData(mandateModel, "dealConstruct", "error")
                    ? getFieldLabelData(
                        mandateModel,
                        "dealConstruct",
                        "helperText"
                      )
                    : ""
                }
              />
            </div>):(<div >{formData.dealConstruct || ''}</div>)
            }
          </div>
          <div className="flex col-gap-15 border-b border-F2F4F7 align-center padding-b24">
            <div className="form-label width-40">
              <div>Companies Suggested by Buyer</div>
              {/* <div className='text-667085 text-14'>Please contact the super administrator to change the buyer’s Email number</div> */}
            </div>
            {isEditable ?  (
              <div className='width-65'>
                <NewTextField
                  //   fieldsetBgColor="transparent"
                  onChange={handleChipInput}
                  onKeyUp={(event) => {
                    handleChipKeyUp(event, "targets");
                  }}
                  placeholder={getFieldLabelData(
                    mandateModel,
                    "targets",
                    "placeholder"
                  )}
                  value={inputValue}
                  fullWidth
                  size="small"
                />
                <div className="flex col-gap-15 margin-t10 flex-wrap">
                  {mandateModel?.targets?.value?.length > 0 &&
                    mandateModel.targets?.value?.map((companiesList, index) => {
                      return (
                        <div
                          className="flex align-center text-344054 bg-F2F4F7 padding-y2 padding-x8 rounded-16"
                          key={companiesList + index}
                        >
                          <span>{companiesList}</span>
                          <CrossIcon
                            sx={{
                              fontSize: "14px",
                              marginTop: "1px",
                              marginLeft: "4px",
                              cursor: "pointer",
                            }}
                            onClick={() => hadleChipDelete("targets", index)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            ): (
              <div>{renderSuggestedCompanies()}</div>
            ) }
          </div>
        </div>
        }
      </div>
    );
}

export default MandateInformation;