import React, { useEffect, useState } from 'react';
import ProfilePage from '../../AdminContainer/BuyerProfile/ProfilePage';
import { useSelector } from 'react-redux';
import NotVerifiedStrip from '../../../Component/NotVerifiedStrip';
import { useNavigate } from 'react-router-dom';
import AccountVerificationModal from './AccountVerificationModal';
import WaitListModal from './WaitListModal';
import { isMobileView } from '../../../helper/commonHelper';
import { BUYER_LANDED_ONBOARDING_VERIFICATION_PENDING } from '../../../constants/posthogEvents';
import WarningCircularIcon from '../../../assets/images/warningCircularIcon.svg';
import { BUYER_ACCOUNT_DELIST_TEXT, BUYER_ACCOUNT_VERIFICATION_PENDING_TEXT } from '../../../constants/MessageConstants';
import { isBuyerUser } from '../../../Services';

function BuyersProfile() {
    const buyerVerificationState = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));
    const [renderContent, setRenderContent] = useState(false) 
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState('');

    useEffect(() => {
        if(buyerVerificationState?.status) {
            // if(!buyerVerificationState?.tncCompleted && buyerVerificationState?.primaryMember) {
            //     navigate('/buyer/tnc-consent');
            //     return;
            // }
            if(isBuyerUser() && buyerVerificationState?.onboardingStage === 1) {
                navigate('/buyer/onboarding');
            }
            if(buyerVerificationState?.status !== 'verified' && buyerVerificationState?.status !== 'delist') {
                if(buyerVerificationState?.type === 'individual') setShowModal('waitList');
                if(buyerVerificationState?.type !== 'individual') setShowModal('verification');
            }
            if(buyerVerificationState?.status === 'verified') {
                setShowModal('');
            }
            if(buyerVerificationState?.status === 'delist') setShowModal('delist');
            setRenderContent(true);
        }

    }, [buyerVerificationState])

    return (
        <React.Fragment>
            {
                renderContent &&
                <div className='buyers-profile-container'>
                    {/* {
                        buyerVerificationState?.status !== 'verified' &&
                        <NotVerifiedStrip />
                    } */}
                    <h1 className={'font-600 text-black ' + (isMobileView() ? 'text-[32px]' : 'margin-t0 margin-b8 text-48 margin-l10')}>Profile</h1>
                    {/* <p className='font-500 tet-18 text-667085 margin-t0 margin-b30'>Update your photo and personal details here.</p> */}
                    <ProfilePage />

                    {
                        showModal ==='verification' &&
                        <AccountVerificationModal icon={WarningCircularIcon} event={BUYER_LANDED_ONBOARDING_VERIFICATION_PENDING} headerText= 'Account Verification Pending' body = {BUYER_ACCOUNT_VERIFICATION_PENDING_TEXT} handleClose={() => setShowModal('')} />
                    }

                    {
                        showModal ==='delist' &&
                        <AccountVerificationModal icon={WarningCircularIcon} headerText= 'Account De-Listed' body={BUYER_ACCOUNT_DELIST_TEXT} handleClose={() => setShowModal('')} />
                    }
                    {
                        showModal ==='waitList' &&
                        <WaitListModal handleClose={() => setShowModal('')} />
                    }
                </div>
            }
        </React.Fragment>
    )
}

export default BuyersProfile;