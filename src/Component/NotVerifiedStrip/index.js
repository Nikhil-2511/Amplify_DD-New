import React from 'react';
import './style.scss';
import { RightArrow } from '../../assets/icons';


function NotVerifiedStrip() {
    return (
        <div className='not-verified-strip-container flex align-center justify-space-between'>
            <div className='flex align-center col-gap-10'>
                <div className='flex padding-y4 padding-x10 align-center col-gap-10 bg-warning rounded-16'>
                    <div className='text-B54708 text-14 font-500'>Account verification pending</div>
                </div>
                <div className='text-14 text-warning'>
                    Actions will be enabled post account verification.
                </div>
            </div>
            <div className='text-white bg-DC6803 rounded-16 padding-x10 padding-y4 col-gap-10 '>
                <a className='text-14 font-500 text-white ' rel="noreferrer" target='_blank' href='https://zcal.co/aneesh-donedeal/introduction' >Schedule a call</a>
            </div>
        </div>
    )
}

export default NotVerifiedStrip;