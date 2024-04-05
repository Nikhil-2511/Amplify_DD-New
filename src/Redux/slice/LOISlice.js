import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRevaluation: false,
  forbiddenModel: {}
}

export const LOISlice = createSlice({
  name: "loi",
  initialState,
  reducers: {
    fetchLOIDetails: (state, action) => {
      
    },
    updateLOIData: (state, action) => {

    }
  }
})

export const {
    fetchLOIDetails,
    updateLOIData
} = LOISlice.actions;

export default LOISlice.reducer;