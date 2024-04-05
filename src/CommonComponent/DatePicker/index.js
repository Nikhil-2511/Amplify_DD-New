import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addMonths } from '../../helper/commonHelper';
import { DesktopDatePicker } from '@mui/x-date-pickers';

export default function DatePickerValue({date, setDateValue, setShowAvailableSlots, renderTimeSlots, showAvailableSlots, handleDateChange, index, maxDateAllowed = 100000, previousDates}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DesktopDatePicker']}>
        <DesktopDatePicker
          label="Select Date and Time"
          className='w-full'
          value={date}
          slotProps={{
            textField: {
                inputProps: {
                    readOnly: true
                }
            }
          }}
          format='DD/MM/YYYY'
          onChange={(newValue) => handleDateChange(newValue)}
          disablePast
          maxDate={dayjs(addMonths(new Date(), maxDateAllowed))}
          onOpen={() => setShowAvailableSlots(-1)}
        ></DesktopDatePicker>
        { showAvailableSlots===index && renderTimeSlots(index) }
      </DemoContainer>
    </LocalizationProvider>
  );
}
