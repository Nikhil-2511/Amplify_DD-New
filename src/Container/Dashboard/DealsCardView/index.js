import React from 'react';
import { ACTIVE_DEALS } from '../../../constants';
import { getDate, renderIconBasedOnDeals } from '../../../helper/commonHelper';
import { GenericButton, OutlineButton } from '../../../CommonComponent/CustomButton';
import './style.scss';
import { Chip } from '@mui/material';

function DealsCardView({listData, handleAccept, handleReject, selectedTab}) {
    console.log("Listdata ", listData);
    return (
        <div className='deals-cardview-container'>
            {
                selectedTab?.label === ACTIVE_DEALS &&
                <div className='flex col-gap-8 align-center'>
                    <div className='text-12 font-500 '>{listData?.id}</div>
                    <Chip label={`${listData?.status || ''}`} sx={{paddingLeft: '5px', paddingRight: '5px', background: '#D0D6FF', color: '#161616', fontSize: '10px', height: '14px'}} />
                </div>
            }
            <div className='text-18 font-600 flex col-gap-8'><span>{listData?.name}</span></div>
            <div className='text-12'>{listData?.description}</div>
            {
                listData?.interactionNotesMobile &&
                <div className='text-12'>
                    <div className='text-B5B5B5 font-500 margin-b4'>Investor’s Message</div>
                    <div className='font-300'>{listData?.interactionNotesMobile}</div>
                </div>
            }
            {
                selectedTab?.label !== ACTIVE_DEALS &&
                <div className=''> 
                    <div className='text-12'>Request Received</div>
                    {listData?.createdAt && <div className='text-14 margin-t3'>{getDate(listData.createdAt)}</div>}
                </div>
            }
            {
                selectedTab?.label === ACTIVE_DEALS &&
                <div className='flex justify-space-between col-gap-10'>
                    {/* <div>
                        <div className='text-12'>Deal Partner</div>
                        <div className='text-14 margin-t3'>{listData?.buySideOwner}</div>
                    </div> */}
                    <div>
                        <div className='text-12'>Last Activity</div>
                        <div className='text-14 margin-t3'>{listData?.updatedAt}</div>
                    </div>
                </div>
            }
            {
                listData?.dealAction && selectedTab?.label !== ACTIVE_DEALS &&
                <div>{listData.dealAction}</div>
            }
        </div>
    )
}

export default DealsCardView;