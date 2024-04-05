import React from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import './style.scss';
import { useSelector } from 'react-redux';

function DealPartnerInfoContainer({}) {
    const partnerInfo = useSelector((state => state.authorizationStore?.dealPartnerDetails ));

    function renderInfo() {
        return (
            <div className='deal-partner-info-container'>
                <div className='margin-b10 text-101828 font-500'>Meet your Deal Partner, {partnerInfo?.firstName || ''} {partnerInfo?.lastName || ''} </div>
                <div className='flex col-gap-10 justify-space-between align-center'>
                    {
                        partnerInfo?.phone &&
                        <div className='flex align-center'>
                            <LocalPhoneIcon sx={{fontSize: 16, color: '#475467'}} />
                            <span className='text-14 text-667085 margin-l5'>{partnerInfo?.phone || ''}</span>
                        </div>
                    }
                    {
                        partnerInfo?.email &&
                        <div className='flex align-center'>
                            <MailOutlineIcon sx={{fontSize: 16, color: '#475467'}} />
                            <span className='text-14 text-667085 margin-l5'>{partnerInfo?.email || ''}</span>
                        </div>
                    }
                </div>
            </div>
        )
    }
    return partnerInfo?.firstName ? renderInfo() : ''
}

export default DealPartnerInfoContainer;