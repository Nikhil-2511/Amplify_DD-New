import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
}

export const MandateSlice = createSlice({
  name: "mandates",
  initialState,
  reducers: {
    fetchBuyerMandates: (state, action) => {
      
    },
    fetchMandateDetails: (state, action) => {
      
    }
  }
})

export const {
    fetchBuyerMandates,
    fetchMandateDetails
} = MandateSlice.actions;

export default MandateSlice.reducer;
