import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { checkUserRole } from '../../utils/userRole';
import { useSelector } from 'react-redux';
import { trackEvent } from '../../helper/posthogHelper';
import { navBarTitles } from '../../constants/posthogEvents';


function MobileNavigation({navigationData}) {
    const buyerVerificationStore = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));

    function IsActive(navigationLink) {
        return navigationLink?.path === window.location.pathname;
    }

    function handleClick(title) {
        trackEvent(navBarTitles?.[title]);
     }

    function renderLinkStructure(navigationLink) {
        let iconImage = navigationLink?.iconComp || <img className='navigation-icons' src={navigationLink?.icon} alt="" />
        return (
            <React.Fragment>
                {
                    navigationLink.hasAction ?
                    <div onClick={navigationLink.action} className={'sidenav-link-content flex flex-col items-center'}>
                        <div>
                            {iconImage}
                        </div>
                        <div className='text-white'>{navigationLink?.title}</div>
                    </div>
                    :
                    <Link onClick={() => handleClick(navigationLink?.title)} to={navigationLink.path} className={'sidenav-link-content ' + (IsActive(navigationLink) ? 'selected' : '')}>
                        <div className='flex flex-col items-center'>
                        <div>
                            {iconImage}
                        </div>
                        <div  className='text-white'>{navigationLink?.title}</div>
                        </div>
                    </Link>
                }
            </React.Fragment>
        )
    }

    return (
        <div className='mobile-navigation-container px-2 justify-between'>
            {
                navigationData?.topNavigation?.length > 0 &&
                navigationData?.topNavigation.map((navigationLink, index) => {
                    if(!navigationLink.isVisible || navigationLink.hideOnMobile) return '';
                    if((navigationLink?.isVerified && !navigationLink.isVerified())) return '';
                    if(navigationLink?.title === 'Mandate' && !checkUserRole('mandate', buyerVerificationStore?.type)) return '';
                    return (
                        <Link onClick={() => handleClick(navigationLink?.title)} to={navigationLink.path} className={'sidenav-link-content ' + (IsActive(navigationLink) ? 'selected' : '')} key={`topNavigation${index}`}>
                            <div className='flex flex-col items-center'>
                            <img className='navigation-icons' src={navigationLink.icon} alt="" />
                            <div className='text-white'>{navigationLink?.title}</div>
                            </div>
                        </Link>
                    )
                })
            }
            {
                navigationData?.bottomNavigation?.length > 0 &&
                navigationData.bottomNavigation.map((navigationLink, index) => {
                    return (
                        <React.Fragment key={`bottomNavigation${index}`}>
                            {renderLinkStructure(navigationLink)}                                        
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default MobileNavigation;