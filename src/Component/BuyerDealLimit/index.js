import React from 'react';
import CircularCountProgressBar from '../../CommonComponent/CircularCountProgressBar';

function BuyerDealLimit({title, description, currentCount = 0, totalCount = 0, hideProgressbar, ...rest}) {
    return (
        <div className=''>
            <div className='flex col-gap-16 align-center'>
                {
                    !hideProgressbar &&
                    <CircularCountProgressBar
                        currentCount={currentCount}
                        totalCount={totalCount}
                        size={60}
                        thickness={5}
                        {...rest}
                    />
                }
                <div>
                    <div className='text-16 font-600 text-101828 margin-b8'>{title}</div>
                    <div className='text-12 text-475467'>{description}</div>
                </div>
            </div>
        </div>
    )
}

export default BuyerDealLimit;