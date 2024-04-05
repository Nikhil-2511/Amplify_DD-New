import React from 'react';
import refreshIcon from '../../assets/icons/refresh.svg';
import refreshIconHighlighted from '../../assets/icons/refreshIconHighlighted.svg';
import informationIcon from '../../assets/icons/ellipseIcon.svg';
import { getValuationValue } from '../../helper/commonHelper';
import { isSellerUser } from '../../Services';

function EstimationValueCard({className, valuationData, metricData, hightlightRefresh, handleRefresh, handleViewFullReport}) {
  return (
    <div className={'' + (className ? className : '')}>
      <div className='flex justify-space-between padding-x20 padding-b15 border-b border-282828'>
        <div className='text-24'>Estimated Valuation</div>
        {isSellerUser() && !hightlightRefresh && <div className='width-27px cursor-pointer relative' onClick={handleRefresh}>
          <img src={refreshIconHighlighted} alt="" />
          <div className='valuation-info-box flex align-center'>
            {/* <div className='valuation-info-box-image'><img src={informationIcon} /></div> */}
            <div className='font-500'>Hit refresh to update the valuation</div>
          </div>
        </div>}
        {isSellerUser() && hightlightRefresh && <div className='width-27px'><img src={refreshIcon} alt=""/></div>}
      </div>
      {<div className='grad-text text-30 font-600 padding-y20 padding-x20'>
       {hightlightRefresh && <span>₹ {`${getValuationValue(metricData?.valuation?.min)}`} CR to {`${getValuationValue(metricData?.valuation?.max)}`} CR</span>}
      </div>}
      <div className='padding-x20 flex justify-center margin-b10'>
        <div className={'padding-y10 border-white border-radius5 w-full text-center ' + (hightlightRefresh ? 'cursor-pointer' : 'pointer-none opacity-50')} onClick={handleViewFullReport}>
          View full report
        </div>
      </div>
    </div>
  )
}

export default EstimationValueCard;