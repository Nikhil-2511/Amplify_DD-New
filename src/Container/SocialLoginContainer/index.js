import React, { useEffect, useState } from 'react';
import { useQuery } from '../../helper/customHook';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { COMPANY_NOT_FOUND, IS_VALID_COMPANY, SESSION_ID, STATE, TOKEN_KEY } from '../../constants';
import { getLinkedinAuth, loginUserSuccess } from '../../Redux/slice/LoginSlice';
import { removeLocalStorage, setLocalStorage } from '../../utils';
import { isAuthenticated, reRouteUser } from '../../Services';
import { Box, Button, Modal } from '@mui/material';
import { getAdminUsers } from '../../helper/actionHelper';
import { trackGA4Event } from '../../utils/GAevents';
import { getSessionStorage } from '../../utils/localStorage';

const style = {
    maxWidth: 500,
    width: '100%',
    bgcolor: '#121212',
    borderRadius: '10px',
    border: '1px solid #353535',
    outline: 'none',
    color: '#fff',
    p: 4,
  };

function SocialLoginContainer() {
    const query = useQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const appSessionStore = useSelector((state) => state.sessionStore);

    useEffect(() => {
        if(isAuthenticated()) {
            reRouteUser(navigate);
            return;
        }
        let code = query.get("code");
        if(code) {
            userSocialAuthentication(code);
        }
        else navigate('/signup');
    }, [])

    function userSocialAuthentication(code) {
        let source = getSessionStorage('utm_source');
        let dataToSend = {
            postBody: {
                // tncConsent: true,
                signUp: true,
                state: STATE,
                code,
                userType: 1,
                source: source || undefined,
                device: navigator.platform
              },
              callback: handleCallback
        }
        dispatch(getLinkedinAuth(dataToSend))
    }
    
    function handleCallback(res) {
        if (res?.status === '200') {
            let dataToPrepare = {
                isAdmin: res?.data?.userType === 2 ? true : false,
                userType: res?.data?.userType || null,
                email: res?.data?.email,
                sessionId: res?.data?.sessionID
              }
            dispatch(loginUserSuccess(dataToPrepare));
            setLocalStorage(TOKEN_KEY, res?.data?.sessionID);
            removeLocalStorage(SESSION_ID);
            setLocalStorage(IS_VALID_COMPANY, res.data.code);
            getAdminUsers();
            trackGA4Event('linkedin_signup_success', {event_category: 'Sign Up', action: 'Social sign up'});
            if(res?.data?.onboardingStage !== 3){
                navigate('/valq');
                return;
            }
            if (res?.data?.code && res.data.code === COMPANY_NOT_FOUND) {
                navigate('/valq');
                return;
            }
            else {
                if (res?.data?.userType === 2) {
                    navigate('/admin/seller');
                    return;
                }
                navigate('/valuation');
            }
        }
        else {
            trackGA4Event('linkedin_signup_success', {event_category: 'Sign Up', error_reason: res?.data?.message, action: 'Sign up'});
            if(res?.data?.code === 'already_registered') {
                setShowModal(true);
            }
            else navigate('/signup');
        }
    }

    function handleClose() {
        navigate('/login');
    }

    return (
        <div className='social-login-container flex align-center justify-center'>
            <h1>loading......</h1>
            <Modal
                open={showModal}
                sx={{ zIndex: 100001 }}
                onClose={() => {}}>
                <div className='global-modal-container'>
                    <Box sx={style}>
                    <div className='global-modal-header text-18 text-white margin-b15'>Warning</div>
                    <div className='global-modal-messaage text-white'>{'Your are already registered with this email. Please go to login screen.'}</div>
                    <div className='margin-t20 text-right'>
                        <Button className='global-modal-cta capitalize' variant='contained' onClick={handleClose}>Go to Login</Button>
                    </div>
                    </Box>
                </div>
            </Modal>
        </div>
    )
}

export default SocialLoginContainer;