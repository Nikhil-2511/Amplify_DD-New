import React, { useEffect, useLayoutEffect,useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SidebarContainer from '../../Component/BuyerComponent/SidebarContainer';
import BuyerListing from '../../Component/BuyerComponent/BuyerListing';
import AppHeader from '../../Component/BuyerComponent/AppHeader';
import { handleThemeChanged, updateTheme } from '../../Redux/slice/CommonSlice';
import { API_SUCCESS_CODE, LIGHT_THEME } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { BuyerSideNavigation } from '../../CommonModels/SideNavigationData';
import BrowserScreen from '../../Container/BuyersContainer/BrowserScreen';
import BuyerDealsContainer from '../../Container/BuyersDealsContainer';
import BuyersOnboarding from '../../Container/BuyersContainer/BuyersOnboarding';
import { isAuthenticated, isBuyerUser, logoutUserRedirectionPath, reRouteUser } from '../../Services';
import NewCueCard from '../../Component/NewCueCard';
import NewLoginContainer from '../../Container/NewLoginContainer';
import BuyersProfile from '../../Container/BuyersContainer/BuyersProfile';
import { fetchBuyerStatus } from '../../Redux/slice/BuyerSlice';
import NewLayoutContainer from '../../Container/NewLayoutContainer';
import ProtectedRoute from '../ProtectedRoutes';
import VerifiedBuyerProtect from '../VerifiedBuyerProtect';
import NewPageNotFound from '../../Container/NewPageNotFound';
import NonProtectedRoute from '../NonProtectedRoutes';
import TncConsentContainer from '../../Container/TncConsentContainer';
import { handleNavigation, isMobileView } from '../../helper/commonHelper';
import WithTracker from '../../HOC/WithTracker';
import { PageMeta } from '../../helper/PageMeta';
import BuyerMandatesContainer from '../../Container/BuyersContainer/BuyerMandate';
import BuyerMandateDetailsContainer from '../../Container/BuyersContainer/BuyerMandateDetailsContainer';
import OpenCuecardView from '../../Container/OpenCuecardView';
import MobileNavigation from '../../Component/MobileNavigation';
import DealLinkContainer from '../../Container/DealLinkContainer';
import DealPartnerModal from '../../CommonComponent/DealPartnerModal';
import WhitePhone from '../../assets/images/whitePhone.svg';

function BuyerRouteStructure() {
    const dispatch = useDispatch();
    const headerState = useSelector((state) => state.headerStateStore);
    const location = useLocation();
    const navigate = useNavigate();
    const buyerVerificationState = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));

    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        document.body.style.fontFamily = "'Instrument Sans', sans-serif";
        dispatch(updateTheme(LIGHT_THEME));
        dispatch(handleThemeChanged(true));
    }, [])

    function CustomRouter() {
        let pathname = location?.pathname, redirectPath = 'not-found';
        if (pathname === '/buyer' || pathname === '/buyer/') {
          if (isAuthenticated()) {
            reRouteUser(navigate, '/buyer/login');
            return;
          }
          else {
            redirectPath = 'login';
          }
        }
        return <Navigate to={redirectPath} replace={true} />
    }

    return (
        <div className={'buyer-route-structure light-theme-fonts ' + (isMobileView() && isAuthenticated() && !location.pathname.includes('/buyer/onboarding') && !location.pathname.includes('/buyer/tnc-consent') ? 'margin-b30 padding-b30' : '')}>
            <NewLayoutContainer>
                {
                    isAuthenticated() && !headerState.hideSidebar && !isMobileView() &&
                    <SidebarContainer navigation={BuyerSideNavigation}/> 
                }
                {
                    isAuthenticated() && isMobileView() && buyerVerificationState?.status === 'verified' && 
                    <MobileNavigation  navigationData={BuyerSideNavigation} />
                }
                {
                    isMobileView() && isAuthenticated() && !location.pathname.includes('/buyer/onboarding') && 
    !location.pathname.includes('/buyer/tnc-consent') && !location.pathname.includes('/buyer/profile') &&
                    <>
                        <div className='custom-side-panel'>
                            <div className='flex side-panel' onClick={handleOpenModal}>
                            <div className='deal-partner-icon'>  
                                 <img src={WhitePhone} />
                            </div>
                                <span style={{color: 'white'}}>Deal Partner</span>
                            </div>
                        </div>
                        { open && 
                            <DealPartnerModal title={"Meet your Deal Partner"} titleIcon={""} closeModal={handleCloseModal} text1={"this email"} text2={'this is num'} btnText={'Close'}/> 
                        }
                    </>
                } 
                <div className={(headerState.hideSidebar || isMobileView()) ? '' : 'body-section'}>
                    {
                        isAuthenticated() && !headerState.hideAppHeader && 
                        <AppHeader />
                    }
                    <div className={isMobileView() ? 'padding-x8' : 'margin-t20 padding-x30'}>
                        <Routes>
                            <Route path='deals' element={
                                <VerifiedBuyerProtect redirectPath={'/buyer/login'} protectedRedirection='/buyer/profile'>
                                    <WithTracker metaData={PageMeta["buyerDeals"]} key="buyerDeals">
                                        <BuyerDealsContainer />
                                    </WithTracker>
                                </VerifiedBuyerProtect> } />
                            <Route index path='browse' element={
                                <VerifiedBuyerProtect redirectPath={'/buyer/login'} protectedRedirection='/buyer/profile'>
                                    <WithTracker metaData={PageMeta["buyerBrowse"]} key="buyerBrowse">
                                        <BrowserScreen />
                                    </WithTracker>
                                </VerifiedBuyerProtect>
                            } />
                            <Route path="cue-card/:uid" element={<VerifiedBuyerProtect redirectPath={'/buyer/login'} protectedRedirection='/buyer/profile'>
                                    <WithTracker>
                                        <NewCueCard />
                                    </WithTracker>
                                </VerifiedBuyerProtect>} />
                            <Route path="profile" element={<ProtectedRoute redirectPath={'/buyer/login'} >
                                <WithTracker metaData={PageMeta['buyerProfile']} key="buyerProfile">
                                    <BuyersProfile />
                                </WithTracker>
                            </ProtectedRoute>} />
                            <Route path="onboarding" element={
                                <NonProtectedRoute>
                                    <WithTracker metaData={PageMeta["buyerOnbording"]} key="buyerOnbording">
                                        <BuyersOnboarding />
                                    </WithTracker>
                                </NonProtectedRoute>} />
                            <Route path="login" element={
                                <NonProtectedRoute>
                                    <WithTracker metaData={PageMeta["buyerLogin"]} key="buyerLogin">
                                        <NewLoginContainer />
                                    </WithTracker>
                                </NonProtectedRoute> } />
                            <Route exact path="tnc-consent" element={
                                <ProtectedRoute redirectPath={'/buyer/login'}>
                                    <WithTracker metaData={PageMeta["buyerTnc"]} key="buyerTnc">
                                        <TncConsentContainer />
                                    </WithTracker>
                                </ProtectedRoute>
                            } />
                            <Route path="mandate" element={<VerifiedBuyerProtect redirectPath={'/buyer/login'} protectedRedirection='/buyer/profile' >
                                <WithTracker metaData={PageMeta["buyerMandate"]} key="buyerMandate">
                                    <BuyerMandatesContainer />
                                </WithTracker>
                            </VerifiedBuyerProtect>} />
                            <Route path="mandate/:uid" element={<VerifiedBuyerProtect redirectPath={'/buyer/login'} protectedRedirection='/buyer/profile' >
                                <WithTracker key="buyerMandateShowPage">
                                    <BuyerMandateDetailsContainer />
                                </WithTracker>
                            </VerifiedBuyerProtect>} />
                            <Route path="view-cue-card/:uid" element={
                                <OpenCuecardView />
                            } />
                            <Route path="deallink/:uid" element={
                                    <WithTracker>
                                        <DealLinkContainer />
                                    </WithTracker>
                                } />
                            <Route path="not-found" element={
                                <WithTracker metaData={PageMeta["notFound"]} key="notFound">
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

export default BuyerRouteStructure;