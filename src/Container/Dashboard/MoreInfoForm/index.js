import { Button, InputAdornment, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  deepClone,
  emailIsValid,
  isAlphabetOnly,
  isMobileView,
  isObjectEmpty,
  isPhoneNumberValid,
  isValidWebsite,
  numbersOnly,
  numbersRangeOnly,
} from "../../../helper/commonHelper";
import CustomTextArea from "../../../CommonComponent/TextArea";
import { ArrowForward } from "@mui/icons-material";
import { updateContactInfo, updateDashboardData } from "../../../Redux/slice/ValuationSlice";
import { useDispatch } from "react-redux";
import QuestionBoolean from "../../../Component/QuestionBoolean";
import QuestionCurrency from "../../../Component/QuestionCurrency";
import './style.scss'
import QuestionMultiLineTextArea from "../../../Component/QuestionMultiLineTextArea";
import { trackEvent } from "../../../helper/posthogHelper";
import { SELLER_CLICKED_SAVE_ADDITIONAL_DETAILS, SELLER_CLICKED_SAVE_CONTACT_DETAILS } from "../../../constants/posthogEvents";

const style = {
  maxWidth: 500,
  width: "100%",
  bgcolor: "#121212",
  borderRadius: "10px",
  border: "1px solid #353535",
  outline: "none",
  color: "#fff",
  p: 4,
};

const initialModel = {
  firstName: {
    required: true,
    error: false,
    helperText: "Please enter a valid first name",
    placeholder: `Enter your first name`,

  },
  lastName: {
    required: true,
    error: false,
    helperText: "Please enter a valid last name",
    placeholder: `Enter your last name`,
  },
  officialEmail: {
    required: false,
    helperText: "Please enter a valid official email",
    placeholder: `Enter your official Email ID`,
  },
  phone: {
    required: true,
    error: false,
    helperText: "Please enter a valid 10-digit phone number",
    placeholder: `Enter your phone number`,
  },
};

const additionalInfoModelPart1 = {
 website : {
    label: "Website",
    placeholder: `Enter your company's website URL`,
    required: false,
    error: false,
    type: "text",
    key : 'website',
    helperText: "Please enter a valid website",
  },
  operational : {
    label: `Is your company operational?`,
    required: true,
    error: false,
    helperText: "Please select status",
    type: "boolean",
    key: 'operational'
  },
};

const additionalInfoModelPart2 = {
    teamSize : {
    label: "Team Size",
    placeholder: "Enter Value",
    type: "numberRange",
    error: false,
    required: true,
    key: 'teamSize',
    helperText: "Please enter a valid team size number",

  },
  founderPedigree : {
    label: "Founder Pedigree",
    placeholder: `For e.g: Founder 1 - Engineer, MBA, 10 years work experience, Founder 2 - Graduate, 15 years domain expertise`,
    required: true,
    error: false,
    helperText: "Please enter pedigree",
    type: "textarea",
    key: 'founderPedigree'
  },
  reasonToBuy: {
    label: "Why invest in us? ",
    placeholder:
      "For e.g: Strong distribution - 10,000 retail touch points across all states",
    type: "textarea",
    error: false,
    required: true,
    helperText: "Please enter a value",
    key: 'reasonToBuy'
  },
  reasonToSell: {
    label: "Reason for sale / raising capital ? ",
    placeholder: "For e.g: Looking for a strategic investor to scale, open to staying on OR Looking for outright acquisition, founder willing to transition for up to 1 year",
    type: "textarea",
    error: false,
    required: true,
    helperText: "Please enter a value",
    key: 'reasonToSell'
  },
  askPrice: {
    label: "Expected Valuation",
    placeholder: "Share your expected pre-money valuation or expectation for 100% company sale",
    type: "currency",
    error: false,
    required: true,
    key: 'askPrice',
    helperText: "Please enter a valid number",
  },
};

export default function MoreInfoForm({className,contactInfo,getContactInfo,sellerInfoStep,showSellerInfoForm,setOpenEnhanceModal,setShowSellerInfoForm,companyData,fetchCompanyData}) {
  const [formData, setFormData] = useState(contactInfo);
  const [fieldModel, setFieldModel] = useState(initialModel);
  const [secondFieldModel, setSecondFieldModel] = useState({...additionalInfoModelPart1, ...additionalInfoModelPart2});

  const dispatch = useDispatch();

  function handleConfirmClick(type='') {
    let payload = {};
    if(type === 'additionalInfo'){
        payload.website = formData?.website
        payload.operational = formData?.operational === 'yes' ? true : false
        payload.teamSize = formData?.teamSize
        payload.founderPedigree = formData?.founderPedigree
        payload.reasonToBuy = formData?.reasonToBuy
        payload.reasonToSell = formData?.reasonToSell
        payload.askPrice = formData?.askPrice
        payload.companyId = companyData?.companyId
    }
    if (!validateData()) {
      let dataToSend = {
        postBody: type === 'additionalInfo'? payload : formData,
        callback: (res) => handleCallback(res,type),
      };
      if(type === 'additionalInfo'){
        trackEvent(SELLER_CLICKED_SAVE_ADDITIONAL_DETAILS);
        dispatch(updateDashboardData(dataToSend));
      } else{
        trackEvent(SELLER_CLICKED_SAVE_CONTACT_DETAILS);
        dispatch(updateContactInfo(dataToSend));
      }

    }
  }
  function handleCallback(res,type='') {
    if (res.status === "200") {
      getContactInfo();
      setOpenEnhanceModal(false);
      if(type === 'additionalInfo'){
      setShowSellerInfoForm(false);
      fetchCompanyData();
      }
    } else {
      if (res?.data?.message) {
        alert(res.data.message);
      }
    }
  }

  function validateData() {
    let error = false,
      newFieldModel = sellerInfoStep===1 ? deepClone(fieldModel) : deepClone(secondFieldModel);

    Object.keys(newFieldModel).forEach((fieldKey) => {
      let fieldValue = newFieldModel[fieldKey];
      if (fieldKey === "phone") {
        if (!isPhoneNumberValid(formData[fieldKey] || "")) {
          error = true;
          newFieldModel[fieldKey].error = true;
        }
      } else if (fieldKey === "officialEmail") {
        if (formData[fieldKey]) {
          if (!emailIsValid(formData[fieldKey] || "")) {
            error = true;
            newFieldModel[fieldKey].error = true;
          }
        }
      }else if(fieldKey === "website"){
        if (formData[fieldKey]) {
          if (!isValidWebsite(formData[fieldKey] || "")) {
            error = true;
            newFieldModel[fieldKey].error = true;
          }
        }
      } else if (fieldValue.required && !formData[fieldKey]) {
        error = true;
        newFieldModel[fieldKey].error = true;
      }
    });

    sellerInfoStep===1 ? setFieldModel(newFieldModel) : setSecondFieldModel(newFieldModel);
    return error;
  }

  function handleChange(val, key) {    
    let newFormData = deepClone(formData),
      newFieldModel = sellerInfoStep===1 ? deepClone(fieldModel) : deepClone(secondFieldModel),
      value = val;
    if (key === "phone" || key === "askPrice") {
      if (value !== 0 && value !== "") {
        if (!numbersOnly(value)) {
          return;
        }
      }
    }
    if(key === "teamSize"){
      if (value !== 0 && value !== "") {
        if (!numbersRangeOnly(value)) {
          return;
        }
      }
    }
    if(key === "firstName" || key === "lastName"){      
      if (value !== 0 && value !== "") {
        if (!isAlphabetOnly(value)) {
          return;
        }
      }
    }
    newFormData[key] = value;
    if (newFieldModel[key]?.error) {
      newFieldModel[key].error = false;
      sellerInfoStep===1 ? setFieldModel(newFieldModel) : setSecondFieldModel(newFieldModel);
    }
     setFormData(newFormData) ;
  }

  function handleBooleanUpdate(val,key){
    let newFormData = deepClone(formData),
    newFieldModel = sellerInfoStep===1 ? deepClone(fieldModel) : deepClone(secondFieldModel)
    newFormData[key] = val 
    if (newFieldModel[key]?.error) {
        newFieldModel[key].error = false;
        sellerInfoStep===1 ? setFieldModel(newFieldModel) : setSecondFieldModel(newFieldModel);
      }
      setFormData(newFormData);
  }

  function getFieldDetails(key, field_name) {
    return sellerInfoStep===1? fieldModel[key][field_name] : secondFieldModel?.[key]?.[field_name];
  }

  function getFieldType(listItem) {
    switch (listItem.type) {
      case "boolean":
        return renderBooleanData(listItem);
      case "currency":
        return renderCurrencyField(listItem);
      case "textarea":
        return (
          <QuestionMultiLineTextArea
            fullWidth
            placeholder={listItem?.placeholder}
            answer={formData?.[listItem?.key] || ''} 
            className={`w-1/2 bg-[#1e1e1e] hide-scrollbar`}
            updateAnswer={(ans) => handleChange(ans, listItem?.key)}
            error={getFieldDetails(listItem?.key, 'error')? getFieldDetails(listItem?.key, 'helperText') : ''}
            multiline={listItem?.type === "textarea" ? true : false}
            minRows={listItem?.type === "textarea" ? 3 : ""}
            maxRows={listItem?.type === "textarea" ? 3 : ""}
            isEditable={true}
            showCharCount={listItem?.key === 'founderPedigree' ? true : false}
          />
        );
        default:
          return (
            <CustomTextArea
              fullWidth
              placeholder={listItem?.placeholder}
              value={formData?.[listItem?.key] || ''} 
              className={`w-1/2 bg-[#1e1e1e]`}
              onChange={(e) => handleChange(e.target.value, listItem?.key)}
              error={
                  getFieldDetails(listItem?.key, "error") ? true : false
              }
              helperText={
                  getFieldDetails(listItem?.key, "error")
                    ? getFieldDetails(listItem?.key, "helperText")
                    : ""
                }
              multiline={listItem?.type === "textarea" ? true : false}
              minRows={listItem?.type === "textarea" ? 2 : ""}
              maxRows={listItem?.type === "textarea" ? 2 : ""}
            />
          );
    }
  }

  function renderCurrencyField(listItem) {
    return (
      <QuestionCurrency
        className="rounded-8 bg-[#1e1e1e]"
        placeholder={
          listItem?.placeholder ? listItem.placeholder : "e.g. 50,000"
        }
        value={formData?.[listItem?.key] || ''} 
        fullWidth={true}
        fieldsetBgColor="#121212"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ root: { color: "#fff", zIndex: 2 } }}
              position="start"
            >
              ₹
            </InputAdornment>
          ),
        }}
        error={getFieldDetails(listItem?.key, 'error') ? true : false}
        helperText={getFieldDetails(listItem?.key, 'error') ? getFieldDetails(listItem?.key, 'helperText') : ''}
        answer={listItem.answer || ""}
        onChange={(e) => handleChange(e.target.value, listItem?.key)}
        size="large"
      />
    );
  }

  function renderBooleanData(listItem) {
    return (
      <QuestionBoolean
        size="large"
        commonClass="primary-theme h-[60px] !mr-[15px]"
        error={getFieldDetails(listItem?.key, 'error')? getFieldDetails(listItem?.key, 'helperText') : ''}
        answer={formData?.[listItem?.key] || ""}
        updateAnswer={(ans) => handleBooleanUpdate(ans,'operational')}
        isEditable={true}
      />
    );
  }

  function renderField(fieldData) {
    return (
      <div className="margin-b20 w-full">
        <div className="text-B5B5B5 text-18 margin-b10">
          {fieldData?.label || ""}
          {fieldData?.required && <span className="text-danger">*</span>}
        </div>
        {getFieldType(fieldData)}
      </div>
    );
  }

  function renderConditionBasedForm() {
    if (sellerInfoStep === 1) {
      return (
        <Modal open={true} sx={{ zIndex: 1001 }} onClose={() => {}}>
          <div className="global-modal-container">
            <Box sx={style}>
              <div className="global-modal-header text-18 text-white margin-b15">
                Contact Information
              </div>
              <div
                className={
                  "flex col-gap-10 margin-b15 " +
                  (isMobileView() ? "flex-direction-coloum row-gap-15" : "")
                }
              >
                <div className="flex-1">
                  <div className="text-B5B5B5 margin-b8">
                    First Name <span className="text-danger">{` *`}</span>
                  </div>
                  <CustomTextArea
                    size="small"
                    fullWidth
                    value={formData?.firstName || ""}
                    onChange={(e) => handleChange(e.target.value, "firstName")}
                    error={getFieldDetails("firstName", "error") ? true : false}
                    placeholder={getFieldDetails("firstName", "placeholder")}
                    helperText={
                      getFieldDetails("firstName", "error")
                        ? getFieldDetails("firstName", "helperText")
                        : ""
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="text-B5B5B5 margin-b8">
                    Last Name <span className="text-danger">{` *`}</span>
                  </div>
                  <CustomTextArea
                    fullWidth
                    size="small"
                    value={formData?.lastName || ""}
                    onChange={(e) => handleChange(e.target.value, "lastName")}
                    error={getFieldDetails("lastName", "error") ? true : false}
                    placeholder={getFieldDetails("lastName", "placeholder")}
                    helperText={
                      getFieldDetails("lastName", "error")
                        ? getFieldDetails("lastName", "helperText")
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="margin-b15">
                <div className="text-B5B5B5 margin-b8">
                  Phone Number <span className="text-danger">{` *`}</span>
                </div>
                <CustomTextArea
                  fullWidth
                  size="small"
                  value={formData?.phone || ""}
                  onChange={(e) => handleChange(e.target.value, "phone")}
                  error={getFieldDetails("phone", "error") ? true : false}
                  autoComplete="off"
                  inputProps={{ maxLength: 10 }}
                  placeholder={getFieldDetails("phone", "placeholder")}
                  helperText={
                    getFieldDetails("phone", "error")
                      ? getFieldDetails("phone", "helperText")
                      : ""
                  }
                />
              </div>
              {
                !isObjectEmpty(contactInfo) && !contactInfo?.officialSignup &&
                <div className=" margin-b15">
                  <div className="text-B5B5B5 margin-b8">Official Email ID</div>
                  <CustomTextArea
                    fullWidth
                    size="small"
                    value={formData?.officialEmail || ""}
                    onChange={(e) => handleChange(e.target.value, "officialEmail")}
                    error={
                      getFieldDetails("officialEmail", "error") ? true : false
                    }
                    placeholder={getFieldDetails("officialEmail", "placeholder")}
                    helperText={
                      getFieldDetails("officialEmail", "error")
                        ? getFieldDetails("officialEmail", "helperText")
                        : ""
                    }
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
              <div className="margin-t20 flex justify-end col-gap-10">
                <Button
                  onClick={handleConfirmClick}
                  size="large"
                  sx={{
                    background: "#3247FF",
                    color: "#fff",
                    border: "1px solid #353535",
                    "&:hover": { background: "#3247FF" },
                    flex: 1,
                  }}
                  className="capitalize w-[100px]"
                  variant="contained"
                >
                  Save & Next <ArrowForward className="ml-2" />
                </Button>
              </div>
            </Box>
          </div>
        </Modal>
      );
    }
    if (sellerInfoStep === 2) {
      return (
        <Modal open={true} sx={{ zIndex: 1001 }} onClose={() => {}}>
          <div className="global-modal-container ">
            <Box className="w-[100vw] sm:w-[60vw] h-[95vh] sm:h-[90vh] rounded-[10px] border-[0.5px] bg-[#1e1e1e] border-[#353535] sm:p-6 p-3 outline-none">
              <div className="overflow-y-scroll custom-scrollbar py-2 w-full h-full">
              <span className={"form-field-title"}>Additional Information</span>
              <div className="sm:flex justify-between items-center pt-3">
                <div className="flex items-center justify-center sm:w-1/2">
                  {renderField(additionalInfoModelPart1?.website)}
                </div>
                <div className="flex items-center justify-center sm:w-1/2 sm:pl-10">
                  {renderField(additionalInfoModelPart1?.operational)}
                </div>
              </div>
              <div className="pb-5">
                {Object?.keys(additionalInfoModelPart2)?.map((field, idx) => {
                  return <React.Fragment key={idx}>{renderField(additionalInfoModelPart2[field])}</React.Fragment>
                })}
              </div>
              <div className="w-full sm:flex sm:justify-end pb-2">
                 <Button
                  onClick={() => handleConfirmClick('additionalInfo')}
                  size="large"
                  sx={{
                    background: "#3247FF",
                    color: "#fff",
                    border: "1px solid #353535",
                    "&:hover": { background: "#3247FF" },
                  }}
                  className={`capitalize ${isMobileView()?'w-full':'w-[100px]'}`}
                  variant="contained"
                >
                  Save
                </Button>
              </div>
              </div>
            </Box>
          </div>
        </Modal>
      );
    }
    return <React.Fragment></React.Fragment>;
  }
  return <React.Fragment>{renderConditionBasedForm()}</React.Fragment>;
}
