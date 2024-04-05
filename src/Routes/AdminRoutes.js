import React, { useLayoutEffect, useState } from 'react';
import AdminListing from '../Container/AdminListing';
import { Dashboard } from '@mui/icons-material';
import BuyerComp from '../Container/BuyersContainer/BuyerRouteComp';
import history from '../history';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminBuyer from '../Container/AdminContainer/AdminBuyer';
import AdminSeller from '../Container/AdminContainer/AdminSeller';
import SidebarContainer from '../Component/BuyerComponent/SidebarContainer';
import AppHeader from '../Component/BuyerComponent/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { handleThemeChanged, updateTheme } from '../Redux/slice/CommonSlice';
import { LIGHT_THEME } from '../constants';
import BuyerProfile from '../Container/AdminContainer/BuyerProfile';
import { AdminSideNavigation } from '../CommonModels/SideNavigationData';
import AdminDealsContainer from '../Container/AdminContainer/AdminDeals';
import NewCueCard from '../Component/NewCueCard';
import { isAdminUser, isAuthenticated, reRouteUser } from '../Services';
import NewLoginContainer from '../Container/NewLoginContainer';
import NonProtectedRoute from './NonProtectedRoutes';
import ProtectedRoute from './ProtectedRoutes';
import NewLayoutContainer from '../Container/NewLayoutContainer';
import NewPageNotFound from '../Container/NewPageNotFound';
import { handleNavigation, isMobileView } from '../helper/commonHelper';
import SellerNotesContainer from '../Container/SellerNotesContainer';
import AdminMandatesContainer from '../Container/AdminContainer/AdminMandates';
import MandateDetailsContainer from '../Container/AdminContainer/MandateDetailsContainer';
import TrackerComponent from '../HOC/TrackerComponent';
import WithTracker from '../HOC/WithTracker';
import { PageMeta } from '../helper/PageMeta';
import DealNotesContainer from '../Container/DealNotesContainer';
import OffPlatform from '../Container/OffPlatform';


function AdminRoutesStruct() {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
      });
    const dispatch = useDispatch();
    const headerState = useSelector((state) => state.headerStateStore);
    const location = useLocation();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        history.listen(setState);
        dispatch(updateTheme(LIGHT_THEME));
        dispatch(handleThemeChanged(true));
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
    }, [history]);

    function CustomRouter() {
        let pathname = location?.pathname, redirectPath = 'not-found';
        if (pathname === '/admin' || pathname === '/admin/') {
          if (isAuthenticated()) {
            reRouteUser(navigate, '/admin/login');
            return;
          }
          else {
            redirectPath = 'login';
          }
        }
        return <Navigate to={redirectPath} replace={true} />
    }

    return (
        <div className='admin-routes-container light-theme-fonts'>
            <NewLayoutContainer>
                {
                    isAuthenticated() && !headerState.hideSidebar &&
                    <SidebarContainer navigation={AdminSideNavigation} />
                }
                {/* {
                    isMobileView() &&
                    <MobileNavigaion />
                } */}
                <div className={isAuthenticated() ? 'body-section' : ''}>
                    {
                        isAuthenticated() && !headerState.hideAppHeader &&
                        <AppHeader />
                    }
                    <div className='padding-t20 padding-x30'>
                        <Routes key={state.history}>
                            <Route path="buyer" element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker metaData={PageMeta["adminBuyer"]} key="adminBuyer">
                                        <AdminBuyer />
                                    </WithTracker>
                                </ProtectedRoute> 
                                } />
                            <Route path="seller" element={ 
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker metaData={PageMeta["adminSeller"]} key="adminSeller">
                                        <AdminSeller />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path='deals' element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker metaData={PageMeta["adminDeals"]} key="adminDeals">
                                        <AdminDealsContainer />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path='offplatform' element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker key="adminOffPlatform">
                                        <OffPlatform />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path='mandate' element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker metaData={PageMeta["adminMandate"]} key="adminMandate">
                                        <AdminMandatesContainer />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path='mandate/:uid' element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker key="mandateProfile">
                                        <MandateDetailsContainer />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path="buyer/profile-page/:uid" element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker key="adminBuyerShowPage">
                                        <BuyerProfile />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path="cue-card/:uid" element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker key="adminCueCard" >
                                        <NewCueCard />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path="notes/:uid" element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker key="noteShowpage">
                                        <SellerNotesContainer />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path="deal-notes/:uid" element={
                                <ProtectedRoute redirectPath={'/admin/login'}>
                                    <WithTracker key="dealsNoteShowPage">
                                        <DealNotesContainer />
                                    </WithTracker>
                                </ProtectedRoute>
                                } />
                            <Route path="login" element={
                                <NonProtectedRoute>
                                    <WithTracker metaData={PageMeta["adminLogin"]} key="adminLogin">
                                        <NewLoginContainer isAdminUser/>
                                    </WithTracker>
                                </NonProtectedRoute>} key="adminLogin" />
                                <Route path="not-found" element={
                                    <WithTracker metaData={PageMeta["notFound"]} key="AdminNotFound">
                                        <NewPageNotFound handleNavigation={() => handleNavigation(navigate)}/>
                                    </WithTracker>
                                } />
                                <Route exact path="*" element={CustomRouter()} />
                        </Routes>
                    </div>
                </div>
            </NewLayoutContainer>
        </div>
    )
}

export default AdminRoutesStruct;