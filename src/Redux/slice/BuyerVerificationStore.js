import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  buyerVerificationState: {}
}

export const BuyerVerificationSlice = createSlice({
  name: "buyerVerification",
  initialState,
  reducers: {
    fetchBuyerStatus: (state, action) => {
        state.isLoading = true;
    },
    fetchBuyerStatusSuccess: (state, action) => {
        state.isLoading = false;
      state.buyerVerificationState = action.payload;
    },
    resetBuyerVerification: (state, action) => {
        state.isLoading = false;
        state.buyerVerificationState = {}
    }
  }
})

export const {
    fetchBuyerStatus,
    fetchBuyerStatusSuccess,
    resetBuyerVerification
} = BuyerVerificationSlice.actions;

export default BuyerVerificationSlice.reducer;