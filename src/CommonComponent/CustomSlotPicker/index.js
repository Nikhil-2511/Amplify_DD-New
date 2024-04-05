import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addMonths, isMobileView } from '../../helper/commonHelper';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { BackArrow } from '../../assets/icons';
import PublicIcon from '@mui/icons-material/Public';
import { Chip } from '@mui/material';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function CustomSlotPicker({ handleSlotConfirm, handleDateChange, maxDateAllowed = 100000, disablePast, format, onlyDatePicker, helperText }) {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedSlot, setSelectedSlot] = useState(-1);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showSlots, setShowSlots] = useState(false);
    const [finalSlot, setFinalSlot] = useState({ date: '', time: "" });

    function formatDate(timeArray) {
        let timeObject = dayjs()
            .set("hour", timeArray[0])
            .set("minute", timeArray[1]);
        // Format the time in 12-hour format (h:mm A)
        let formattedTime = timeObject.format("h:mm A");
        return formattedTime;
    }

    function handleChange(date) {
        handleDateChange(date, handleDateChangeCb);
        setSelectedDate(date);
    }

    function handleDateChangeCb(timeSlots) {
        setAvailableSlots(timeSlots);
        setShowSlots(true);
    }

    function handleConfirm() {
        if(selectedSlot < 0) return;
        setFinalSlot({ date: selectedDate, time: availableSlots?.[selectedSlot] });
        handleSlotConfirm({ date: selectedDate, time: availableSlots?.[selectedSlot] });
        setShowSlots(false);
        setSelectedSlot(-1);
    }

    function handleRemoveSlot() {
        setFinalSlot({});
        handleSlotConfirm({});
        setSelectedDate(null);
    }

    function renderTimeSlots() {
        return (
            <div
                className={`z-[10000] absolute bottom-[70px] flex flex-col
             bg-white shadow-lg rounded-md ${isMobileView() ? "min-w-[320px] p-1" : "min-w-[350px] pr-1 pl-3 py-3 w-full"
                    } right-0`}
            >
                <div className="flex justify-between">
                    <div className="pb-3 pt-2 text-[#344054] font-bold">
                        <BackArrow
                            className="cursor-pointer mr-3"
                            onClick={() => {setShowSlots(false); setSelectedSlot(-1)}}
                        />
                        Back
                    </div>
                </div>
                <div
                    className={`flex flex-wrap justify-around box-border custom-scrollbar overflow-y-scroll max-h-[170px] ${isMobileView() ? "" : ""
                        }`}
                >
                    {availableSlots?.length ? (
                        availableSlots?.map((val, idx) => {
                            return (
                                <div
                                    onClick={() => setSelectedSlot(idx)}
                                    key={idx}
                                    className={`cursor-pointer rounded-md border-[1px] font-medium text-center flex items-center justify-center my-2 mx-2 ${idx == selectedSlot
                                        ? "text-white bg-[#344054]"
                                        : "text-[#344054]"
                                        } border-[#344054] ${!isMobileView() ? 'h-[43px] w-[85px]' : 'w-[80px] h-[43px]'}`}
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
                    <PublicIcon /> Indian Standard Time
                </div>
                <div
                    onClick={() => handleConfirm()}
                    className={`${selectedSlot < 0 ? "pointer-events-none opacity-40" : "cursor-pointer"
                        } rounded-md bg-[#1D2939] tracking-wide text-white font-bold text-center ml-2 mr-4 py-2 mt-3`}
                >
                    Confirm
                </div>
            </div>
        );
    }


    return (
        <div className='relative'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DesktopDatePicker']}>
                    <DesktopDatePicker
                        label="Select Date and Time"
                        className='w-full'
                        value={selectedDate ? dayjs(selectedDate): null}
                        slotProps={{
                            textField: {
                                inputProps: {
                                    readOnly: true
                                }
                            }
                        }}
                        format={format}
                        onChange={(newValue) => handleChange(newValue)}
                        disablePast={disablePast}
                        maxDate={dayjs(addMonths(new Date(), maxDateAllowed))}
                    ></DesktopDatePicker>
                    {showSlots && renderTimeSlots()}
                </DemoContainer>
            </LocalizationProvider>
            {finalSlot?.time && <div
                className={`top-[22px] absolute flex left-[31%] justify-around`}
            >
                <Chip
                    className={`h-[28px] ${isMobileView() ? 'w-[165px]' : 'w-[170px]'} text-[#1D2939] px-0`}
                    sx={{
                        background: "#FFFFFF",
                        height: "28px",
                        fontWeight: 400,
                        fontSize: "15px",
                        paddingLeft: "0",
                        paddingRight: "0"
                    }}
                    label={
                        finalSlot?.time
                            ? formatDate(finalSlot?.time) +
                            " - " +
                            formatDate([finalSlot?.time?.[0] , finalSlot?.time?.[1] + 30])
                            : ""
                    }
                />
                <div className={`${isMobileView() ? '' : 'ml-1'}`}>
                    <DeleteOutlineOutlinedIcon
                        onClick={() => handleRemoveSlot()}
                        className="cursor-pointer"
                    />
                </div>
            </div>}
            {finalSlot?.time && helperText && <div className='text-[#667085] text-[14px] mt-2'>{helperText}</div>}
        </div>
    );
}
