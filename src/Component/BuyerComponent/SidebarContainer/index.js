import React from 'react';
import { Avatar, Divider, Stack, Tooltip } from '@mui/material';
import { DoneDealWhiteLogo } from '../../../assets/icons/svgIcons';
import './style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomPopover from '../../../CommonComponent/CustomPopover';
import { isAuthenticated, isBuyerUser, reRouteUser } from '../../../Services';
import CircularCountProgressBar from '../../../CommonComponent/CircularCountProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { isObjectEmpty } from '../../../helper/commonHelper';
import { globalAlert } from '../../../Redux/slice/CommonSlice';
import WarningCircularIcon from '../../../assets/images/warningCircularIcon.svg';
import { checkUserRole } from '../../../utils/userRole';
import { trackEvent } from '../../../helper/posthogHelper';
import { navBarTitles } from '../../../constants/posthogEvents';


function SidebarContainer({navigation}) {
    const navigate = useNavigate();
    const location = useLocation();
    const buyerParams = useSelector((state) => state.buyerStore?.buyerParams);
    const dispatch = useDispatch();
    const buyerVerificationStore = useSelector((state => state.buyerVerificationStore?.buyerVerificationState ));

    function renderLinkStructure(navigationLink) {
        let iconImage = navigationLink?.iconComp || <img className='navigation-icons' src={navigationLink?.icon} alt="" />
        return (
            <React.Fragment>
                {
                    navigationLink.hasAction ?
                    <div onClick={navigationLink.action} className={'sidenav-link-content inline-block'}>
                        {iconImage}
                    </div>
                    :
                    <Link onClick={() => handleClick(navigationLink?.title)} to={navigationLink.path} className={'sidenav-link-content inline-block ' + (IsActive(navigationLink) ? 'selected' : '')}>
                        {iconImage}
                    </Link>
                }
            </React.Fragment>
        )
    }

    function IsActive(navigationLink) {
        return navigationLink?.path === window.location.pathname;
    }

    function handleReroute() {
        if(isAuthenticated()) {
            reRouteUser(navigate);
        }
        else {
            let pathname = location?.pathname;
            if(pathname.indexOf('/admin/')) {
                navigate('/admin/login');
            }
            else {
                navigate('/buyer/login');
            }
        }
    }

    function renderDealCountMessage() {
        return `You have used ${buyerParams?.interestDealCount}/${buyerParams?.totalInterestDealCount} free deals. Contact your deal partner to upgrade.`
    }

    function handleProgressBarClick() {
        dispatch(globalAlert({isOpen: true, icon: WarningCircularIcon, message: renderDealCountMessage(), title: 'Deal Limit'}));
    }

    function handleClick(title) {
       trackEvent(navBarTitles?.[title]);
    }

    return (
        <div className='sidebar-container'>
            <Stack direction="column" height={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                <div>
                    <div className='cursor-pointer flex justify-center items-center' onClick={handleReroute}>{DoneDealWhiteLogo}</div>
                    <Stack direction="column" className='sidenav-links' rowGap={1}>
                        {
                            navigation?.topNavigation?.length > 0 &&
                            navigation.topNavigation.map((navigationLink, index) => {
                                if(!navigationLink.isVisible) return '';
                                if((navigationLink?.isVerified && !navigationLink.isVerified())) return '';
                                if(isBuyerUser() && navigationLink?.title === 'Mandate' && !checkUserRole('mandate', buyerVerificationStore?.type)) return '';
                                return (
                                    <CustomPopover title={navigationLink.title} placement="right" key={`topNavigation${index}`} >
                                        <Link onClick={() => handleClick(navigationLink.title)} to={navigationLink.path} className={'sidenav-link-content inline-block ' + (IsActive(navigationLink) ? 'selected' : '')}>
                                                <img className='navigation-icons' src={navigationLink.icon} alt="" />
                                        </Link>
                                    </CustomPopover>
                                )
                            } )
                        }
                    </Stack>
                </div>
                <Stack className='sidenav-footer' direction='column' rowGap={0.5} alignItems={'center'} divider={<Divider orientation="horizontal" flexItem sx={{borderColor: '#475467', my: 0.5, }} />}>
                    {
                        isBuyerUser() && !isObjectEmpty(buyerParams) && !buyerParams?.dealLimitBypass &&
                        <div className='cursor-pointer' onClick={handleProgressBarClick}>
                            <CircularCountProgressBar
                                currentCount={buyerParams?.interestDealCount}
                                totalCount={buyerParams?.totalInterestDealCount}
                                size={40}
                                thickness={5}
                                typographyColor='#fff'
                                fontSize={10} 

                            />
                        </div>
                    }
                    <Stack direction={'column'} rowGap={1}>
                        {/* <div className='sidenav-link-content'>{TestIcon}</div> */}
                        {
                            navigation?.bottomNavigation?.length > 0 &&
                            navigation.bottomNavigation.map((navigationLink, index) => {
                                return (
                                    <CustomPopover title={navigationLink.title} placement="right" key={`bottomNavigation${index}`}>
                                        {renderLinkStructure(navigationLink)}                                        
                                    </CustomPopover>
                                )
                            })
                        }
                    </Stack>
                </Stack>
            </Stack>
        </div>
    )
}

export default SidebarContainer;