import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";

const initialState = {
  isLoading: false,
  analyticsData: {}
}

export const SellerSlice = createSlice({
  name: "sellerListing",
  initialState,
  reducers: {
    fetchSellers: (state, action) => {
      
    },
    updateCompanyInterest: (state, action) => {

    },
    createNewCompany: (state, action) => {

    },
    fetchGAData: (state, action) => {
      state.analyticsData = action.payload;
    },
    fetchGASummary: (state, action) => {

    },
    getAnalyticsSummary: (state, action) => {
    }
  }
})

export const {
    fetchSellers,
    updateCompanyInterest,
    createNewCompany,
    fetchGAData,
    fetchGASummary,
    getAnalyticsSummary
} = SellerSlice.actions;

export default SellerSlice.reducer;