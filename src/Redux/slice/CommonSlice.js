import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalPayload: {},
  isRevaluation: false,
  forbiddenModel: {},
  pageTitle: '',
  hideSidebar: false,
  hideAppHeader: false,
  snackbarState: {},
  previousPath: '',
  congratulationModal: {},
  firstTimeUser: false,
  logoutModel: {},
  showElDetails: {},
  showDelist:{},
  refreshPage: false,
  buyerPageReload: {},
  actionState: {},
  areHeadersShown: false,
  noteModelView: {},
  cueCardRefresh: false,
  twoCtaModalPayload: {},
}

export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    globalAlert: (state, action) => {
      state.modalPayload = action.payload;
    },
    setLoader: (state, action) => {
      state.isLoading = action.payload;
      // state.loadingTitle = action.payload.loadingTitle;
    },
    updateRevaluation: (state, action) => {
      state.isRevaluation = action.payload;
    },
    updateFobiddenModel: (state, action) => {
      state.forbiddenModel = action.payload;
    },
    updatePageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    handleThemeChanged: (state, action) => {
      state.themeChanged = action.payload;
    },
    updateFormToServer: (state, action) => {
      
    },
    fetchDataFromServer: (state, action) => {
      
    },
    updateSnackbar: (state, action) => {
      state.snackbarState = action.payload;
    },
    updatePreviousPath: (state, action) => {
      state.previousPath = action.payload;
    },
    fetchPdf: (state, action) => {

    }, 
    updateLogoutModel: (state, action) => {
      state.logoutModel = action.payload;
    },
    updateCongratulationModal: (state, action) => {
      state.congratulationModal = action.payload;
    },
    updateFirstTimeUser: (state, action) => {
      state.firstTimeUser = action.payload;
    },
    showElDetailsModal: (state, action) => {
      state.showElDetails = action.payload;
    },
    showDelistModal:(state,action)=>{
      state.showDelist = action.payload;
    },
    uploadDocument: (state, action) => {
      
    },
    fetchDocument: (state, action) => {

    },
    documentUserValiate: (state, action) => {

    },
    documentQuery: (state, action) => {
      
    },
    updateDealPitchdeckAccess: (state, action) => {
      
    },
    fetchBuyerParams: (state, action) => {

    },
    
    reloadPage: (state, action) => {
      state.refreshPage = action.payload;
    },
    updateActionState: (state, action) => {
      state.actionState = action.payload;
    },
    
    hideHeader: (state, action) => {
      state.areHeadersShown = action.payload || false;
    },

    showNoteViewModal: (state, action) => {
      state.noteModelView = action.payload || false;
    },
    updateCuecardRefresh: (state, action) => {
      state.cueCardRefresh = action.payload;
    },
    updateTwoCtaModal: (state, action) => {
      state.twoCtaModalPayload = action.payload;
    }
  }
})

export const {
  globalAlert,
  setLoader,
  updateRevaluation,
  updateFobiddenModel,
  updatePageTitle,
  updateTheme,
  handleThemeChanged,
  updateFormToServer,
  fetchDataFromServer,
  updateSnackbar,
  updatePreviousPath,
  fetchPdf,
  updateCongratulationModal,
  updateFirstTimeUser,
  updateLogoutModel,
  showElDetailsModal,
  showDelistModal,
  uploadDocument,
  fetchDocument,
  documentUserValiate,
  documentQuery,
  updateDealPitchdeckAccess,
  fetchBuyerParams,
  reloadPage,
  updateActionState,
  hideHeader,
  showNoteViewModal,
  updateCuecardRefresh
} = CommonSlice.actions;

export default CommonSlice.reducer;