import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loginResponse: {},
  logoutResponse: {},
  passcodeSuccessData: {},
  logoutUserAction: {},
  adminUsersList: [],
  dealPartnerDetails: {}
}

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoading= true;
    },
    loginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.loginResponse = action.payload
    },
    logoutUser: (state, action) => {
      state.isLoading = true;
    },
    logoutUserSuccess: (state, action) => {
      state.logoutResponse = action.payload;
    },
    getPasscode: (state, action) => {
      state.isLoading = true;
    },
    getPasscodeSuccess: (state, action) => {
      state.isLoading = false;
      state.passcodeSuccessData = action.payload;
    },
    logoutAction: (state, action) => {
      state.logoutUserAction = action.payload;
    },
    verifyEmailAction: (state, action) => {

    },
    fetchAdminUsers: (state, action) => {
      
    },
    fetchAdminUserSuccess: (state, action) => {
      state.adminUsersList = action.payload;
    },
    fetchDealPartner: (state, action) => {

    },
    fetchDealPartnerSuccess: (state, action) => {
      state.dealPartnerDetails = action.payload;
    },
    getLinkedinAuth: (state, action) => {
      
    },
    resetUser: (state, action) => {
      state.isLoading = false;
      state.logoutResponse = action.payload;
      state.adminUsersList = [];
      state.dealPartnerDetails = {};
      state.passcodeSuccessData = {};
    },
    updateEditedEmailAction: (state, action) => {
      
    },
    getUserDetails: (state, action) => {

    }
  }
})

export const {
  loginUser,
  loginUserSuccess,
  logoutUser,
  logoutUserSuccess,
  getPasscode,
  getPasscodeSuccess,
  logoutAction,
  verifyEmailAction,
  fetchAdminUsers,
  fetchAdminUserSuccess,
  fetchDealPartner,
  fetchDealPartnerSuccess,
  getLinkedinAuth,
  resetUser,
  updateEditedEmailAction,
  getUserDetails
} = LoginSlice.actions;

export default LoginSlice.reducer;