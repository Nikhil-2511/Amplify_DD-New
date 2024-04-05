import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valuationData: {},
  isLoading: false,
  metricData: {}
}

export const ValuationSlice = createSlice({
  name: "valuation",
  initialState,
  reducers: {
    getCompanyData: (state, action) => {
      state.isLoading = true;
    },
    companyDataSuccess: (state, action) => {
      state.isLoading = false;
      state.valuationData = action.payload;
    },
    getMetricData: (state, action) => {
      state.isLoading = true;
    },
    metricSuccessData: (state, action) => {
      state.isLoading = true;
      state.metricData = action.payload;
    },
    fetchedData: (state, action) => {
      state.isLoading = false;
    },
    updateCompanyAction: (state, action) => {
      state.isLoading = true;
    },
    updateDashboardData: (state, action) => {
      state.isLoading = true;
    },
    getEvalutadData: (state, action) => {
      state.isLoading = true
    },
    fetchContactInfo: (state, action) => {
      
    },
    updateContactInfo: (state, action) => {

    },
    fetchDealsCount: (state, action) => {

    },
    fetchElStatus: (state, aaction) => {

    },
    downloadLetter:(state,action)=>{

    }
  }
})

export const {
  getCompanyData,
  companyDataSuccess,
  getMetricData,
  metricSuccessData,
  fetchedData,
  updateCompanyAction,
  updateDashboardData,
  getEvalutadData,
  fetchContactInfo,
  updateContactInfo,
  fetchDealsCount,
  fetchElStatus,
  downloadLetter
} = ValuationSlice.actions;

export default ValuationSlice.reducer;