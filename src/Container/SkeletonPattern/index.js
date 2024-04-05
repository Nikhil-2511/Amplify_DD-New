import { Divider } from '@mui/material';
import React from 'react';
import CustomSkeleton from '../../Component/CustomSkeleton';

function SkeletonPattern({type}) {

    function renderPattern() {
        switch(type) {
            case 1: 
                return ;
            default: 
                return defaultPattern();
        }
    }

    function defaultPattern() {
        return (
            <div className='padding-x30'>
                <div className='container primary-theme padding-y30 rounded-8'>
                    <CustomSkeleton sx={{borderRadius: '8px'}} height={150}></CustomSkeleton>
                    <Divider className='margin-y20 padding-y20'></Divider>
                    <CustomSkeleton sx={{borderRadius: '8px'}} height={100}></CustomSkeleton>
                    <Divider className='margin-y20 padding-y20'></Divider>
                    <CustomSkeleton sx={{borderRadius: '8px'}} height={100}></CustomSkeleton>
                </div>
            </div>
        )
    }
    return renderPattern()
}

export default SkeletonPattern;