import React, { useState } from 'react';

import './style.scss';

function UpcomingFeatureSection({className}) {
  const [upcomingFeature, setUpcomingFeature] = useState([
    // {
    //   label: 'LOI',
    //   subheading: 'Agreement terms for the Deal'
    // },
    {
      label: 'Inbox',
      subheading: 'Chat the buyers to know more '
    },
    {
      label: 'Get mentored',
      subheading: 'Make your acquisition process easy '
    },
    {
      label: 'Get Help',
      subheading: 'Financial, legal & PR assistance '
    }
  ])
  return (
    <>
  {/* <div className={'upcoming-feature-section ' + (className? className : '')}>
      <div className='flex justify-space-between padding-x20 padding-b15 border-b border-282828 margin-b15'>
        <div className='text-24'>Other Features</div>
      </div>
      <div className='padding-b5 padding-x20 '>
        {
          upcomingFeature.map((featureList, index) => (
            <div className='margin-b25' key={index}>
              <div className='flex align-center justify-space-between margin-b5'>
                <span className='text-22 font-500'>{featureList.label}</span>
                <span className='upcoming-feature-chip'>Coming soon</span>
              </div>
              <p className='margin-0 font-300 text-14'>
                {featureList.subheading}
              </p>
            </div>
          ))
        }
      </div>
    </div> */}
    </>
  
  )
}

export default UpcomingFeatureSection;