import React, { useRef, useState } from "react";
import ModalWrapper from "../../../ModalWrapper";
import CircularSuccessIcon from "../../../assets/images/circularTickIcon.svg";
import { NewButton } from "../../../CommonComponent/NewCustomButton";
import { Button, Chip, Paper, Popover } from "@mui/material";
import DatePickerValue from "../../../CommonComponent/DatePicker";
import { BackArrow } from "../../../assets/icons";
import useOutsideClick from "../../../helper/useDetectClickOutside";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import PublicIcon from '@mui/icons-material/Public';
import {
  fetchAvailableSlots,
  setSlots,
  toggleSlotSchedular,
} from "../../../Redux/slice/BuyerSlice";
import dayjs from "dayjs";
import { deepClone, isMobileView } from "../../../helper/commonHelper";
import { updateCuecardRefresh, updateFormToServer, updateSnackbar } from "../../../Redux/slice/CommonSlice";
import { API_SUCCESS_CODE, POST } from "../../../constants";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { trackEvent } from "../../../helper/posthogHelper";
import { BUYER_MEETING_SLOT_CONFIRMED } from "../../../constants/posthogEvents";
import { ENDPOINT } from "../../../config/endpoint";
import { EXPRESS_INTEREST_OPTIONAL_DESCRIPTION } from "../../../constants/MessageConstants";
import NewTextField from "../../../CommonComponent/NewTextField";
import { updateCompanyInterest } from "../../../Redux/slice/SellerSlice";
import { checkUserRole } from "../../../utils/userRole";
import CustomCheckboxIcon from "../../../CommonComponent/CustomCheckboxIcon";
import ModalWithTwoCTAs from "../../../Modals/ModalWithTwoCTAs";
const styles = {
  maxWidth: 450,
};

function SlotSchedulerModal({ handleClose, companyUid, companyId }) {
  const [date, setDateValue] = useState([]);
  const [showAvailableSlots, setShowAvailableSlots] = useState(-1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDayNSlot, setSelectedDayNSlot] = useState([
    { date: undefined , time: "" },
  ]);
  const [selectedSlot, setSelectedSlot] = useState(-1);
  const timeSlotRef = useRef();
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  // useOutsideClick(timeSlotRef, () => handleCancelSlotSelection());
  const [openToAcquisition, setOpenToAcquisition] = useState(null);
  const [openToFunding, setOpenToFunding] = useState(null);
  const buyerVerificationStore = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));
  const [closeConfirmation, setCloseConfirmation] = useState(false);
  const [fundingError, setFundingError] = useState(false);

  function handleSelectSlot(slot,idx) {
    setSelectedSlot(idx);
  }

  function handleCancelSlotSelection(index) {
    setShowAvailableSlots(-1);
    setSelectedSlot(-1);
  }

  function handleConfirm(idx) {
    let slots = deepClone(selectedDayNSlot);
    let slotObj = slots?.[idx];
    slotObj.time = availableSlots?.[selectedSlot];
    // dayjs()?.hour(selectedSlot?.[0])?.format("h A");
    slots[idx] = slotObj;
    setSelectedDayNSlot(slots);
    setShowAvailableSlots(-1);
    setSelectedSlot(-1);
  }

  function isConfirmCTAActive() {
    // if (selectedDayNSlot?.length === 1) {
    //   if(!selectedDayNSlot[0]?.date && ((checkUserRole('expressIntrest', buyerVerificationStore?.type) && (openToFunding || openToAcquisition)) || description)) return true;
    //   else if(!!selectedDayNSlot[0]?.date && !!selectedDayNSlot[0]?.time) {
    //     return true;
    //   }
    //    return false;
    // } else if (selectedDayNSlot?.length === 2) {
    //   if(!selectedDayNSlot[1]?.date && ((!!selectedDayNSlot[0]?.date && !!selectedDayNSlot[0]?.time) || ((checkUserRole('expressIntrest', buyerVerificationStore?.type) && (openToFunding || openToAcquisition)) || description))) return true;
    //   else if(!!selectedDayNSlot[1]?.time && !!selectedDayNSlot[1]?.date) return true;
    //   return false;
    // }
    if(selectedDayNSlot?.length === 2 && selectedDayNSlot[1]?.date && !selectedDayNSlot[1]?.time) return false;
    if(selectedDayNSlot[0]?.date && !selectedDayNSlot[0]?.time) return false;
    return true;
  }

  function prepareMeetSlots() {
    let meetSlots = [];
    for (let i = 0; i < selectedDayNSlot?.length; i++) {
      if (selectedDayNSlot[i]?.date && selectedDayNSlot[i]?.time) {
        let slotObj = {
          date: dayjs(selectedDayNSlot[i]?.date)?.format("YYYY-MM-DD"),
          startTime: selectedDayNSlot[i]?.time,
        };
        meetSlots.push(slotObj);
      }
    }
    return meetSlots;
  }

  function handleConfirmSlots() {
    if(!isConfirmCTAActive()) return;
    if( checkUserRole('expressIntrest', buyerVerificationStore?.type) && !openToFunding && !openToAcquisition) {
      setFundingError(true);
      return;
    }
    let dataToSend = {
      postBody: {
        meetSlots: prepareMeetSlots(),
        companyId: companyId,
        stage: 'express_interest',
        interactionNotes: description,
        openToAcquisition: openToAcquisition,
        openToFunding: openToFunding

      },
      callback: handleConfirmSlotCb,
    };
    // dispatch(updateFormToServer(dataToSend));
    // dispatch(setSlots(dataToSend));
    dispatch(updateCompanyInterest(dataToSend))
  }

  function handleConfirmSlotCb(res) {
    if (res?.status === API_SUCCESS_CODE) {
      dispatch(toggleSlotSchedular({ open: false }));
      dispatch(updateCuecardRefresh(true));
      dispatch(
        updateSnackbar({
          message: "Successfully sent interest to company",
          isOpen: true,
          type: "success",
        })
      );
      trackEvent(BUYER_MEETING_SLOT_CONFIRMED);
    } else {
      dispatch(
        updateSnackbar({
          message: "Something went wrong",
          isOpen: true,
          type: "error",
        })
      );
    }
  }

  function handleDateChange(newDate, idx) {
    let dataToSend = {
      payload: {
        meetingDate: dayjs(newDate)?.format("YYYY-MM-DD"),
        companyUid: companyUid,
      },
      callback: (res) => handleDateChangeCB(res, newDate, idx),
    };
    dispatch(fetchAvailableSlots(dataToSend));
  }

  function handleDateChangeCB(res, newDate, idx) {
    setDateValue(newDate);
    setShowAvailableSlots(idx);
    setAvailableSlots(filterSlots(newDate, res?.data?.timeSlots, idx));
    let slots = deepClone(selectedDayNSlot);
    let slot = slots?.[idx];
    slot.date = newDate;
    slot.time = "";
    // dayjs(newDate)?.format("YYYY-MM-DD");
    slots[idx] = slot;
    setSelectedDayNSlot(slots);
  }

  function handleAddMoreSlot() {
    let slots = deepClone(selectedDayNSlot);
    let newSlot = { date: undefined, time: "" };
    slots.push(newSlot);
    setSelectedDayNSlot(slots);
  }

  function handleRemoveSlot(index) {    
    let remainingSlot = selectedDayNSlot?.filter((slot, idx) => {
      return index !== idx;
    });
    setSelectedDayNSlot(remainingSlot);
    setShowAvailableSlots(-1);
    setSelectedSlot(-1);
  }

  function formatDate(timeArray) {
    let timeObject = dayjs()
      .set("hour", timeArray[0])
      .set("minute", timeArray[1]);
    // Format the time in 12-hour format (h:mm A)
    let formattedTime = timeObject.format("h:mm A");
    return formattedTime;
  }
  
  function filterSlots(date, slotsArr, index) {
    if (selectedDayNSlot?.length === 2) {
      let alreadySelectedSlot = selectedDayNSlot?.[(index + 1) % 2];
      let date1 = dayjs(deepClone(alreadySelectedSlot?.date));
      let date2 = dayjs(deepClone(date));
      if (date1.isSame(date2, "day")) {
        let remainingSlots = slotsArr?.filter((slot, slotIdx) => {
          return (
            JSON.stringify(alreadySelectedSlot?.time) !== JSON.stringify(slot)
          );
        });
        return remainingSlots;
      }
    }
    return slotsArr;
  }

  function renderTimeSlots(index) {
    return (
      <div
        ref={timeSlotRef}
        className={`z-[10000] absolute bottom-[70px] flex flex-col
         bg-white shadow-lg rounded-md ${
           isMobileView() ? "min-w-[320px] p-1" : "min-w-[400px] pr-1 pl-3 py-3"
         } right-0`}
      >
        <div className="flex justify-between">
          <div className="pb-3 pt-2 text-[#344054] font-bold">
            <BackArrow
              className="cursor-pointer mr-3"
              onClick={() => handleCancelSlotSelection(index)}
            />
            Back
          </div>
        </div>
        <div
          className={`grid grid-cols-4 justify-around box-border custom-scrollbar overflow-y-scroll max-h-[170px]`}
        >
          {availableSlots?.length ? (
            availableSlots?.map((val, idx) => {
              return (
                <div
                  onClick={() => handleSelectSlot(val,idx)}
                  key={idx}
                  className={`cursor-pointer rounded-md border-[1px] font-medium text-center flex items-center justify-center my-2 ${
                    idx == selectedSlot
                      ? "text-white bg-[#344054]"
                      : "text-[#344054]"
                  } border-[#344054] ${!isMobileView()?'h-[43px] w-[85px]':'w-[80px] h-[43px]'}`}
                >
                  {formatDate(val)}
                </div>
              );
            })
          ) : (
            <div className="text-center font-bold p-5">
              No slots available for this date.
            </div>
          )}
        </div>
        <div
          className={'text-[12px] text-[#667085] text-center mt-3 font-[500]'}
        >
         <PublicIcon/> Indian Standard Time
        </div>
        <div
          onClick={() => handleConfirm(index)}
          className={`${
            selectedSlot < 0 ? "pointer-events-none opacity-40" : "cursor-pointer"
          } rounded-md bg-[#1D2939] tracking-wide text-white font-bold text-center ml-2 mr-4 py-2 mt-3`}
        >
          Confirm
        </div>
      </div>
    );
  }

  function showDeleteCTA() {
    return selectedDayNSlot?.length === 2;
  }

  function renderAddOrRemoveCTA() {
    if (
      selectedDayNSlot?.length === 1 &&
      selectedDayNSlot[0]?.date &&
      selectedDayNSlot[0]?.time
    ) {
      return (
        <div
          className="cursor-pointer rounded-md font-bold text-center mb-6"
          onClick={handleAddMoreSlot}
        >
          Add more
        </div>
      );
    } else {
      return;
    }
  }


  function handleCloseConfirmationModal() {
    setCloseConfirmation(false);
  }

  function handleConfirmConfirmationModal() {
    handleCloseConfirmationModal();
    dispatch(toggleSlotSchedular({ open: false }));
  }

  function handleAcquisition() {
    setFundingError(false); 
    setOpenToAcquisition(!openToAcquisition)
  }

  function handleFunding() {
    setFundingError(false); 
    setOpenToFunding(!openToFunding)
  }

  return (
    <div>
      {
        checkUserRole('expressIntrest', buyerVerificationStore?.type) &&
        <div>
          <div className="text-344054 margin-b12 margin-t20">Goal of conversation <span className="error-text">*</span></div>
          <div className="flex align-center">
            <div className="cursor-pointer flex flex-1" onClick={() => handleAcquisition()}>
              <CustomCheckboxIcon isActive={openToAcquisition} />
              <span className='text-344054'>Acquisition</span>
            </div>
            <div className="cursor-pointer flex flex-1" onClick={() => handleFunding()}>
              <CustomCheckboxIcon isActive={openToFunding} />
              <span className='text-344054'>Investment</span>
            </div>
          </div>
          {
            fundingError &&
            <div className="error-text text-14 margin-t8">Please select at least one goal of this conversation</div>
          }
        </div>
      }
      <div className="">
        <div className='text-344054 margin-b12 margin-t20'>Add a note to send to the founder (Optional)</div>
        <NewTextField
            className="rounded-8 "
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            fullWidth
            autoComplete='off'
            multiline={true}
            maxRows={4}
            inputProps={{ maxLength: 400 }}
            placeholder={EXPRESS_INTEREST_OPTIONAL_DESCRIPTION}
            value={description}
        />
      </div>
      <div className="text-344054 margin-t20 margin-b12">
        For smooth scheduling, add timeslots 2 to 7 days from now for an initial conversation (Optional)
      </div>
      {selectedDayNSlot?.map((slot, idx) => {
        return (
          <div key={idx} className="mb-1 relative">
            <DatePickerValue
              date={slot?.date ? dayjs(slot?.date) : null}
              setDateValue={setDateValue}
              setShowAvailableSlots={setShowAvailableSlots}
              renderTimeSlots={() => renderTimeSlots(idx)}
              showAvailableSlots={showAvailableSlots}
              index={idx}
              handleDateChange={(newDate) => handleDateChange(newDate, idx)}
              maxDateAllowed={2}
            />
            <div
              className={`top-[22px] absolute flex left-[31%] justify-around`}
            >
              <Chip
                className={`h-[28px] ${isMobileView()?'w-[165px]':'w-[170px]'} text-[#1D2939] px-0`}
                sx={{
                  background: "#FFFFFF",
                  height: "28px",
                  fontWeight: 400,
                  fontSize: "15px",
                  paddingLeft:"0",
                  paddingRight:"0"
                }}
                label={
                  slot?.time
                    ? formatDate(slot?.time) +
                      " - " +
                      formatDate([slot?.time?.[0] , slot?.time?.[1] + 30])
                    : ""
                }
              />
              {showDeleteCTA() ? (
                <div className={`${isMobileView()?'':'ml-1'}`}>
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleRemoveSlot(idx)}
                    className="cursor-pointer"
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
      {renderAddOrRemoveCTA()}
      <div className="modal-action-container mt-5 flex col-gap-10 justify-end">
        <Button
          className="capitalize"
          fullWidth
          sx={{ color: "#1D2939", fontWeight: 500 }}
          variant="text"
          onClick={() => setCloseConfirmation(true)}
        >
          Cancel
        </Button>
        <NewButton
          className={`capitalize ${
            (isConfirmCTAActive()) ? "" : "opacity-40 pointer-events-none"
          }`}
          fullWidth
          sx={{ fontWeight: 500 }}
          color="secondary"
          variant="contained"
          onClick={handleConfirmSlots}
        >
          Send Interest
        </NewButton>
      </div>
      {
        closeConfirmation &&
        <ModalWithTwoCTAs 
          handleConfirm={handleConfirmConfirmationModal}
          handleCancel={handleCloseConfirmationModal}
          cancelLabel='Back'
        >
          Your interest has not been sent to the company yet. Are you sure you want to cancel?
        </ModalWithTwoCTAs>
      }
    </div>
  );
}

export default ModalWrapper(
  SlotSchedulerModal,
  "Expressed Interest to Company",
  CircularSuccessIcon,
  styles
);
