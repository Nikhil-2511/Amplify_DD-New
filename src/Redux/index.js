import { loadState, saveState } from "../utils";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootSaga from "./saga";
import LoginSlice from "./slice/LoginSlice";
import QuestionsSlice from "./slice/QuestionsSlice";
import CommonSlice from "./slice/CommonSlice";
import ValuationSlice from "./slice/ValuationSlice";
import CuecardSlice from "./slice/CuecardSlice";
import LOISlice from "./slice/LOISlice";
import SellerSlice from "./slice/SellerSlice";
import BuyerSlice from "./slice/BuyerSlice";
import FilterSlice from "./slice/FilterSlice";
import DealsSlice from "./slice/DealsSlice";
import BuyerVerificationSlice from "./slice/BuyerVerificationStore";
import { loadSessionState, saveSessionState } from "../utils/persistState";
import AppNavigationSlice from "./slice/AppNavigationSlice";
import AppSessionSlice from "./slice/AppSessionSlice";

const sagaMiddleware = createSagaMiddleware();
const preloadedState = loadState();
const sessionState = loadSessionState();

const store = configureStore({
  reducer: {
    authorizationStore: LoginSlice,
    questionStore: QuestionsSlice,
    commonStore: CommonSlice,
    valuationStore: ValuationSlice,
    cuecardStore: CuecardSlice,
    loiStore: LOISlice,
    sellerStore: SellerSlice,
    buyerStore: BuyerSlice,
    filterStore: FilterSlice,
    dealStore: DealsSlice,
    buyerVerificationStore: BuyerVerificationSlice,
    headerStateStore: AppNavigationSlice,
    sessionStore: AppSessionSlice
  },
  preloadedState,
  sessionState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false })
      .concat(sagaMiddleware)
      .concat(logger),
});

store.subscribe(() => {
  const authorizationStore = store.getState().authorizationStore;
  const commonStore = store.getState().commonStore;
  const buyerVerificationStore = store.getState().buyerVerificationStore;
  const sessionStore = store.getState().sessionStore;

  saveState({
    authorizationStore,
    commonStore,
    buyerVerificationStore
  });
  
  saveSessionState({
    sessionStore
  })
});

sagaMiddleware.run(rootSaga);

export default store;