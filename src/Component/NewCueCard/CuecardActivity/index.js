import React, { useEffect, useState } from 'react';
import ActivityIcon from '../../../assets/images/cuecardActivityIcon.svg';
import './style.scss';

function CuecardActivity({cuecardData, ...rest}) {

    return (
        <div className='flex margin-t20 cuecard-activity-container'>
            <div className='activity-icon-container'>
                <img src={ActivityIcon} alt="" />
            </div>
            <div className='flex flex-direction-coloum row-gap-12'>
                <p className='margin-0'>Move quickly</p>
                <p className='margin-0'><span className='font-600'>{`{${cuecardData?.activeDealCount}}`}</span> active conversations with this company.</p>
            </div>
        </div>
    )
}

// export default SideInformationWrapper({OriginalComponent: CuecardActivity, title: 'Cue Card Activity', description: '', icon: RefreshGrenIcon })
export default CuecardActivity;