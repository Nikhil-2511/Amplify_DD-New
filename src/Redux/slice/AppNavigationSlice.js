import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hideSidebar: false,
  hideAppHeader: false,
}

export const appNavigationSlice = createSlice({
  name: "appNavigationSlice",
  initialState,
  reducers: {
    updateSidebarState: (state, action) => {
      state.hideSidebar = action.payload;
    },
    updateAppHeaderState: (state, action) => {
      state.hideAppHeader = action.payload;
    },
  }
})

export const {
  updateSidebarState,
  updateAppHeaderState,
} = appNavigationSlice.actions;

export default appNavigationSlice.reducer;