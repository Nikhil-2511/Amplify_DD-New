import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GenericButton } from '../../CommonComponent/CustomButton';
import { globalAlert, setLoader, updateActionState, updateFobiddenModel, updateLogoutModel, updatePageTitle, updatePreviousPath } from '../../Redux/slice/CommonSlice';
import { isSellerUser, logoutUserRedirectionPath, reRouteUser } from '../../Services';
import Loader from '../../CommonComponent/Loader';
import { clearLocalStorage } from '../../utils';
import { loginUserSuccess, logoutAction, logoutUser, resetUser } from '../../Redux/slice/LoginSlice';
import { globalMessage } from '../../helper/commonHelper';
import CustomSnackbar from '../../CommonComponent/CustomSnackbar';
import { resetBuyerVerification } from '../../Redux/slice/BuyerVerificationStore';
import { useTheme } from '@emotion/react';
import WarningCircularIcon from '../../assets/images/warningCircularIcon.svg';
import { useLocationChange } from '../../helper/customHook';
import { updateBuyerParams } from '../../Redux/slice/BuyerSlice';



function HomeLayoutContainer({children}) {
    const redirect = useNavigate();
    const commonStore = useSelector((state) => state.commonStore);
    const authorizationStore = useSelector((state) => state.authorizationStore);
    const loggedInUser = useSelector((state) => state.authorizationStore?.loginResponse);
    const theme = useTheme();
    const style = {
        maxWidth: 500,
        width: '100%',
        bgcolor: theme?.palette?.modalStyling?.main || '#121212',
        borderRadius: '10px',
        // border: '1px solid #353535',
        outline: 'none',
        color: theme?.palette?.modalStyling?.contrastText || '#fff',
        p: 4,
    };  
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(setLoader(false));
    }, [])

    useLocationChange((location, previousLocation) => {
        if(previousLocation?.pathname && location?.pathname !== previousLocation?.pathname) {
            let search = previousLocation?.search || '';
            dispatch(updatePreviousPath(previousLocation.pathname + search));
        }
    })

    // useEffect(() => {
    //     if(isSellerUser() && window.innerWidth <=1024) {
    //         dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: 'For optimal browsing, we recommend accessing our platform on a desktop or laptop.', title: 'Optimized for Larger Screens'}));
    //     }
    // }, [])

    useEffect(() => {
        if(authorizationStore?.logoutUserAction?.hasLogout) {
            let dataToSend = {
                postBody: {
                  email: loggedInUser.email,
                },
                callback: (res) => handleLogoutCb(res, authorizationStore?.logoutUserAction?.redirectUrl)
              }
              dispatch(logoutUser(dataToSend));
              dispatch(logoutAction({}));
        }

    }, [authorizationStore])

    function handleLogoutCb(res, redirectUrl) {
        if (res?.status === '200') {
          clearLocalStorage();
          userLogoutActions();
          if(redirectUrl) {
              redirect(redirectUrl);
          }
          else {
              redirect('/login');
          }
        }
        else {
          globalMessage(res?.message || 'Something went bad!! Please try again later');
        }    
      }

    function handleModalClose() {
        dispatch(globalAlert({}));
    }

    function userLogoutActions() {
        clearLocalStorage();
        dispatch(loginUserSuccess({}));
        dispatch(updatePreviousPath(''));
        dispatch(resetBuyerVerification());
        dispatch(updatePageTitle(''));
        dispatch(resetUser());
        dispatch(updateBuyerParams({}));
        dispatch(updateActionState({}))
    }
    
    function handleForbiddenClose() {
        dispatch(updateFobiddenModel({}));
        reRouteUser(redirect);
    }
    
    function handleLogin() {
        userLogoutActions();
        dispatch(updateLogoutModel({}));
        redirect(logoutUserRedirectionPath());
    }

    return (
        <React.Fragment>
            {children}
            {
                commonStore?.isLoading &&
                <Loader isOpen={commonStore?.isLoading} />
            }
            {
                commonStore?.modalPayload?.isOpen &&
                <Modal
                open={commonStore?.modalPayload?.isOpen}
                onClose={handleModalClose}>
                <div className='global-modal-container'>
                    <Box sx={style}>
                    <div className='global-modal-header text-18 margin-b15'>
                        <div className='flex col-gap-15 align-center'>
                            {
                                commonStore?.modalPayload?.icon &&
                                <img className='w-36px' src={commonStore?.modalPayload?.icon} alt="" />
                            }
                            <div className='text-22 font-500'>{commonStore?.modalPayload?.title || 'Warning'}</div>
                        </div>
                    </div>
                    <div className='global-modal-messaage '>{commonStore?.modalPayload?.message || 'Something went wrong!! Please try again later'}</div>
                    <div className='margin-t20 text-right'>
                        <GenericButton color="modalButton" className='global-modal-cta capitalize' variant='contained' onClick={handleModalClose}>Okay</GenericButton>
                    </div>
                    </Box>
                </div>
                </Modal>
            }
            {
                commonStore?.forbiddenModel?.isOpen &&
                <Modal
                    open={commonStore?.forbiddenModel?.isOpen}
                    sx={{ zIndex: 100001 }}
                    onClose={handleForbiddenClose}>
                    <div className='global-modal-container'>
                        <Box sx={style}>
                        <div className='global-modal-header text-18  margin-b15'>
                            <div className='flex col-gap-15 align-center'>
                                {
                                    commonStore?.forbiddenModel?.icon &&
                                    <img className='w-48px' src={commonStore?.forbiddenModel?.icon} alt="" />
                                }
                                <div className='text-18 font-500'>{commonStore?.forbiddenModel?.title || 'Warning'}</div>
                            </div>
                        </div>
                        <div className='global-modal-messaage '>{commonStore?.forbiddenModel?.message || 'You are not authorised to see this screen.'}</div>
                        <div className='margin-t20 text-right'>
                            <GenericButton color="modalButton" className='global-modal-cta capitalize' variant='contained' onClick={handleForbiddenClose}>Go Back</GenericButton>
                        </div>
                        </Box>
                    </div>
                </Modal>
            }
            {
                commonStore?.snackbarState?.isOpen &&
                <CustomSnackbar />
            }
            {
                commonStore?.logoutModel?.isOpen &&
                <Modal
                open={commonStore?.logoutModel?.isOpen}
                sx={{ zIndex: 100001 }}
                onClose={() => {}}>
                <div className='global-modal-container'>
                    <Box sx={style}>
                    <div className='global-modal-header text-18  margin-b15'>
                        <div className='flex col-gap-15 align-center'>
                            {
                                commonStore?.logoutModel?.icon &&
                                <img className='w-48px' src={commonStore?.logoutModel?.icon} alt="" />
                            }
                            <div className='text-18 font-500'>{commonStore?.logoutModel?.title || 'Warning'}</div>
                        </div>
                    </div>
                    <div className='global-modal-messaage '>{commonStore?.logoutModel?.message || 'Your session has expired! Please login in to continue'}</div>
                    <div className='margin-t20 text-right'>
                        <Button color="modalButton" className='global-modal-cta capitalize' variant='contained' onClick={handleLogin}>Go to Login</Button>
                    </div>
                    </Box>
                </div>
                </Modal>
            }
            {/* {
                commonStore?.congratulationModal?.isOpen &&
                <CongratulationModal />
            } */}
        </React.Fragment>
    )
}

export default HomeLayoutContainer