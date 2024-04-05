import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  buyerVerificationState: {},
  buyerParams: {},
  isSlotSchedulerModalOpen: {}
}

export const BuyerSlice = createSlice({
  name: "buyerListing",
  initialState,
  reducers: {
    fetchBuyers: (state, action) => {
      
    },
    fetchBuyerProfile: (state, action) => {

    },
    fetchCompanyInerested: (state, action) => {

    },
    updateBuyerProfileData: (state, action) => {

    },
    fetchActiveDeals: (state, action) => {

    },
    createBuyer: (state, action) => {

    },
    fetchBuyerFilters: (state, action) => {

    },
    updateBuyerParams: (state, action) => {
      state.buyerParams = action.payload;
    },
    toggleSlotSchedular: (state, action) => {
      state.isSlotSchedulerModalOpen = action?.payload
    },
    fetchAvailableSlots: (state, action) => {

    },
    setSlots: (state, action) => {

    }
  }
})

export const {
    fetchBuyers,
    fetchBuyerProfile,
    fetchCompanyInerested,
    updateBuyerProfileData,
    fetchActiveDeals,
    createBuyer,
    fetchBuyerFilters,
    updateBuyerParams,
    toggleSlotSchedular, 
    fetchAvailableSlots,
    setSlots
} = BuyerSlice.actions;

export default BuyerSlice.reducer;