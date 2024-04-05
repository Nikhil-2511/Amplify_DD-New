import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import QuestionnaireFillerScreen from '../Component/QuestionnaireFillerScreen';
import Signup from '../Container/Signup';
import Valuation from '../Component/Valuation';
import AdminListing from '../Container/AdminListing';
import CueCard from '../Container/CueCard';
import Dashboard from '../Container/Dashboard';
import NotFound from '../Container/NotFound';
import QuestionScreen from '../Container/QuestionScreen';
import { handleThemeChanged, updateTheme } from '../Redux/slice/CommonSlice';
import { isAdminUser, isAuthenticated } from '../Services';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import Login from '../Container/Login';
import SocialLoginContainer from '../Container/SocialLoginContainer';
import SellerDeals from '../Container/SellerDeals';
import WithTracker from '../HOC/WithTracker';
import { PageMeta } from '../helper/PageMeta';
import DataRoom from '../Container/DataRoom';
import SellerOnboarding from '../Container/SellerOnboarding';
import SellerAnalytics from '../Container/SellerAnalytics';

function RoutesStructure({ history }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  const hideHeader = useSelector((state => state.commonStore?.areHeadersShown ))
  const currentPath = history.location?.pathname

  // useEffect(() => {
  //   if(isAuthenticated()) {
  //   }
  // }, [])

  useLayoutEffect(() => {
    history.listen(setState);
    dispatch(updateTheme('darkTheme'));
    dispatch(handleThemeChanged(true));
    document.body.style.backgroundColor = '#070707';
    document.body.style.color = '#fff';
  }, [history]);

  function CustomRouter() {
    let pathname = state?.location?.pathname, redirectPath = 'not-found';
    if (pathname === '/') {
      if (isAuthenticated()) {
        if (isAdminUser()) {
          redirectPath = 'admin/seller'
        }
        else {
          redirectPath = 'dashboard'
        }
      }
      else {
        redirectPath = 'login';
      }
    }
    return <Navigate to={redirectPath} replace={true} />
  }

  // function removeHeaderFooter(){
  //  if(currentPath === '/valq' || currentPath === '/signup' || currentPath === '/login') return true;
  //  else return false;
  // }

  return (
    <div className={`routes-structure-container ${hideHeader ? '!pb-0':''}`}>
     {!hideHeader &&  <div className='seller-header'>
       <Header /> 
      </div> }
      <Routes key={state.history}>
        <Route exact path="/valq" element={
          <WithTracker metaData={PageMeta["sellerQuestionnaire"]} key="sellerQuestionnaire">
            {/* <QuestionScreen /> */}
            <SellerOnboarding/>
          </WithTracker>
        } />
        <Route exact path="/login" element={
          <WithTracker metaData={PageMeta["sellerLogin"]} key="sellerLogin">
            <Login key="login" />
          </WithTracker>
        } />
        <Route exact path="/signup" element={
          <WithTracker metaData={PageMeta["sellerSignup"]} key="sellerSignup">
            <Signup key="signup" />
          </WithTracker>
        } />
        <Route exact path="/not-found" element={
          <WithTracker metaData={PageMeta["notFound"]} key="sellerNotFound">
            <NotFound />
          </WithTracker>
        } />
        <Route exact path="/valuation" element={
          <WithTracker metaData={PageMeta["valuationReport"]} key="valuationReport">
            <Valuation />
          </WithTracker>
        } />
        <Route exact path="/dashboard" element={
          <WithTracker metaData={PageMeta["sellerDashboard"]} key="sellerDashboard">
            <Dashboard />
          </WithTracker>
        } key="user" />
        {/* Old url disabled  */}
        {/* <Route exact path="/cue-card/:companyId" element={<CueCard />} /> */}
        <Route exact path="/intro" element={
          <WithTracker metaData={PageMeta["sellerIntro"]} key="sellerIntro">
            <QuestionnaireFillerScreen />
          </WithTracker>
        } />
        {/* <Route path="/user-auth" element={<UserAuthentication />} /> */}
        <Route exact path="admin-user/dashboard/:companyId" element={
          <WithTracker metaData={PageMeta["sellerDashboard"]} key="adminSellerDashboard">
            <Dashboard />
          </WithTracker>
        } key="admin" />
        {/* <Route exact path="admin-listing" element={<AdminListing />} /> */}
        <Route exact path="/social-auth-login" element={
          <WithTracker metaData={PageMeta["socialSignUp"]} key="socialSignUp">
            <SocialLoginContainer />
          </WithTracker>
        } />
        <Route path="/deals/:companyId?" element={
          <WithTracker metaData={PageMeta["sellerDeals"]} key="sellerDeals">
            <SellerDeals /> 
          </WithTracker>
        } />

        <Route path="dataroom/:uid?" element={
          <WithTracker metaData={PageMeta["dataroom"]} key="dataroom">
            <DataRoom />
          </WithTracker>
        } key="dataroom" /> 

        <Route path="/analytics" element={
          <WithTracker metaData={PageMeta["analytics"]} key="analytics">
            <SellerAnalytics />
          </WithTracker>
        } /> 

        <Route exact path="*" element={CustomRouter()} /> 

      </Routes>
      {!hideHeader && <div className='seller-footer'>
        <Footer />
      </div> }
    </div>
  )
}

export default RoutesStructure;