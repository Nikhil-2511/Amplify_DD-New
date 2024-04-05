import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
}

export const DealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    fetchDeals: (state, action) => {
        
    },
    getSellerSlots: (state, action) => {

    }
  }
})

export const {
    fetchDeals,
    getSellerSlots
} = DealsSlice.actions;

export default DealsSlice.reducer;