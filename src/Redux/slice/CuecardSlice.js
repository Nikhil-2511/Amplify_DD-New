import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false
}

export const CuecardSlice = createSlice({
  name: "cuecard",
  initialState,
  reducers: {
    updateCaptureInterest: (state, action) => {
      state.isLoading = true;
    },
    updateCaptureView: (state, action) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.isLoading = false;
    },
    getCueCardData: (state, action) => {
      state.isLoading = true;
    },
    addCueCardEmail: (state, action) => {
      state.isLoading = true;
    },
    getOpenCuecardData: (state, action) => {
      state.isLoading = true;
    },
    createCuecardLink: (state, action) => {
      state.isLoading = true;
    }
    
  }
})

export const {
  updateCaptureInterest,
  updateCaptureView,
  fetchSuccess,
  getCueCardData,
  getOpenCuecardData,
  addCueCardEmail,
  createCuecardLink
} = CuecardSlice.actions;

export default CuecardSlice.reducer;