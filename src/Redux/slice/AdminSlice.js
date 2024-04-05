import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false
}

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAdminListingData: (state, action) => {
      state.isLoading = action.payload;
    },
    adminFetchSuccess: (state, action) => {
      state.isLoading = false;
    },
    dealLimitByPass: (state, action) => {

    }
  }
})

export const {
  getAdminListingData,
  adminFetchSuccess,
  dealLimitByPass
} = AdminSlice.actions;

export default AdminSlice.reducer;