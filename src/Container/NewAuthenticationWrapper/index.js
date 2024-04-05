import React from 'react';
import MultiGradientImage from '../../assets/images/multiGradientImage.svg';
import { DoneDealWhiteLogo } from '../../assets/icons/svgIcons';
import { isMobileView } from '../../helper/commonHelper';

function NewAuthenticationWrapper({renderLeftSection, renderRightSection, renderHeaderSection, renderFooterSection, rightSectionClassName, rightSectionContentClassName}) {
    return (
        <div className='buyers-onboarding-container'>
            {/* <div className='start-container'></div> */}
            {
                !isMobileView() &&
                <div className='buyer-onboarding-left-section'>
                    {/* <div className='multi-gradient'>
                        <img src={MultiGradientImage} alt="" />
                    </div> */}
                    <div className='buyer-onbaording-content-wrapper'>
                        {
                            renderLeftSection()
                        }
                    </div>
                </div>
            }
            <div className={`buyer-onboarding-step-wrapper ` + (rightSectionClassName || '')}>
                {
                    !!renderHeaderSection &&
                    <div className='buyer-onbaording-header-container'>
                        {renderHeaderSection()}
                    </div>
                }
                <div className={`${isMobileView()?'flex flex-col justify-between':''} ` + (rightSectionContentClassName || '')}>
                    {
                        renderRightSection()
                    }
                </div>
                {
                    !!renderFooterSection &&
                    <div className='buyer-onbaording-footer-container'>
                        {renderFooterSection()}
                    </div>
                }
            </div>
        </div>
    )
}

export default NewAuthenticationWrapper;