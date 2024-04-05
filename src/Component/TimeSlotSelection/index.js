import React from 'react';
import CustomRadio from '../../CommonComponent/CustomRadio';
import { FormControlLabel, FormGroup } from '@mui/material';
import moment from 'moment';
import { getDate } from '../../helper/commonHelper';
import { NO_SLOT } from '../../constants/keyVariableConstants';
import dayjs from "dayjs";

function TimeSlotSelection({selectedSlot, timeSlotsOptions, handleOnChange}) {

    function renderSlotTime(timeArray=[]) {
        if(timeArray?.length === 0) return;
        let timeObject = dayjs()
        .set("hour", timeArray[0])
        .set("minute", timeArray[1]);
        // Format the time in 12-hour format (h:mm A)
        let formattedTime = timeObject.format("h:mm A");
        return formattedTime;
    }
    
    function renderSlotData(date) {
        return dayjs(date)?.format("DD-MM-YYYY");
        
    }

    function handleChange(event) {
        handleOnChange(event.target.value);
    }

    return (
        <React.Fragment>
            {
                timeSlotsOptions?.length > 0 &&
                <div>
                    <div className='margin-b8'>The buyer has sent the following timeslots. Select one. If neither work, please coordinate over email <span className='text-danger'>*</span></div>
                    <div className='flex flex-direction-coloum row-gap-8'>
                    {
                        timeSlotsOptions.map((timeSlotListItem, index) => {
                            return (
                                <FormGroup className='flex-1' key={index}>
                                    <FormControlLabel sx={{marginLeft: 0, marginRight: 0, fontSize: '16px', '&.MuiTypography-root': {fontSize: '16px'}}} className='bg-282828 rounded-8 padding-x10 padding-y10 text-16' control={<CustomRadio size="small" checked={timeSlotListItem?.id == selectedSlot} sx={{ color: '#fff', padding: '5px', fontSize: '16px', '&.Mui-checked': { color: '#3247FF' } }} onChange={(e) => handleChange(e)} value={timeSlotListItem.id} />} label={<span className='text-16'>{`${renderSlotData(timeSlotListItem?.possibleDate)} at ${renderSlotTime(timeSlotListItem?.startTime)} ${timeSlotListItem?.endTime?.length > 0 ? `- ${renderSlotTime(timeSlotListItem?.endTime)}` : ''}`}</span>} labelPlacement="end" />
                                </FormGroup>
                            )
                        })
                    }
                    <FormGroup className='flex-1'>
                        <FormControlLabel sx={{marginLeft: 0, marginRight: 0}} className='bg-282828 rounded-8 padding-x10 padding-y10 text-16' control={<CustomRadio size="small" checked={NO_SLOT === selectedSlot} sx={{ color: '#fff', fontSize: '16px', padding: '5px', '&.Mui-checked': { color: '#3247FF' } }} onChange={(e) => handleChange(e)} value={NO_SLOT} />} label={<span className='text-16'>Neither, schedule over email</span>} labelPlacement="end" />
                    </FormGroup>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default TimeSlotSelection;