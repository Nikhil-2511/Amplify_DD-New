import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    utmSorceValue: ''
}

export const AppSessionSlice = createSlice({
  name: "appSession",
  initialState,
  reducers: {
    updateUtmSorce: (state, action) => {
      state.utmSorceValue = action.payload;
    }
  }
})

export const {
    updateUtmSorce,
} = AppSessionSlice.actions;

export default AppSessionSlice.reducer;