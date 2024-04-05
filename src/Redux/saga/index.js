import { all } from 'redux-saga/effects';
import login from './Login';
import question from './Question';
import valuation from './Valuation';
import cuecard from './Cuecard';
import admin from './Admin';
import loiSaga from './LOISaga';
import sellerSaga from './Seller';
import buyerSaga from './Buyer';
import dealsSaga from './Deals';
import common from './Common';
import buyerVerification from './BuyerVerification';
import Mandate from './Mandate';

export default function* RootSaga() {
  yield all([
    login(),
    question(),
    valuation(),
    cuecard(),
    admin(),
    loiSaga(),
    sellerSaga(),
    buyerSaga(),
    dealsSaga(),
    common(),
    buyerVerification(),
    Mandate()
  ]);
}