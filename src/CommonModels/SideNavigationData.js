import HomeIcon from '../assets/images/navigationHomeIcon.svg';
import BuyersIcon from '../assets/images/buyersNavigationIcon.svg';
import DealsIcon from '../assets/images/breifcaseNavigationIcon.svg';
import OffplatformIcon from '../assets/images/offPlatform.svg';
import BuildingIcon from '../assets/images/buildingNavigationIcon.svg';
import BellIcon from '../assets/images/bellIcon.svg'; 
import { Pathname, RouteTitle } from '../constants/RouteConstants';
import { handleLogoutUser } from '../helper/actionHelper';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingIcon from '../assets/images/settingIcon.svg';
import BrowseIcon from '../assets/images/browseScreenIcon.svg';
import BuildingIconWhite from '../assets/images/buildingIconWhite.svg';
import ShopIcon from '../assets/images/shopIcon.svg';
import { isVerifiedBuyer } from '../helper/commonHelper';
import { isAdminUser, isAuthenticated } from '../Services';
import MandateNavigationIcon from '../assets/images/mandateNavigationIcon.svg';

const CreateNavigation = ({...rest}) => ({...rest})

const BuyersNavigation = {
    title: 'Buyers',
    icon: BuyersIcon,
    path: ''
}

const SellersNavigation = {
    title: 'Sellers',
    icon: BuildingIcon,
    path: ''
}

const DealsNavigation = {
    title: 'Deals',
    icon: DealsIcon,
    path: ''
}

const NotificationNavigation = {
    title: 'Notification',
    icon: BellIcon,
    path: ''
}


export const BuyerSideNavigation = {
    topNavigation: [
        // CreateNavigation({title: RouteTitle.buyerHome, icon: HomeIcon, path: '/buyer/dashboard'}),
        CreateNavigation({title: RouteTitle.browse, icon: BrowseIcon, path: Pathname.browseScreen, isVisible: true, isVerified: isVerifiedBuyer}),
        CreateNavigation({title: RouteTitle.deals, icon: DealsIcon, path: Pathname.buyerDeals, isVisible: true,  isVerified: isVerifiedBuyer}),
        CreateNavigation({title: RouteTitle.mandate, icon: MandateNavigationIcon, path: Pathname.buyerMandate, isVisible: true,  isVerified: isVerifiedBuyer, hideOnMobile: false}),
        // CreateNavigation({title: RouteTitle.buyers, icon: BuyersIcon, path: ''}),
        // CreateNavigation({title: RouteTitle.notification, icon: BellIcon, path: ''}),
    ],
    bottomNavigation: [
        CreateNavigation({title: RouteTitle.profile, icon: SettingIcon, path: Pathname.buyerProfile}),
        CreateNavigation({title: RouteTitle.logout, iconComp: <PowerSettingsNewIcon sx={{color: '#fff'}} />, hasAction: true, action: () => handleLogoutUser('/buyer/login')}),
    ]
}

export const AdminSideNavigation = {
    topNavigation: [
        // CreateNavigation({title: RouteTitle.home, icon: HomeIcon, path: ''}),
        CreateNavigation({title: RouteTitle.sellers, icon: ShopIcon, path: Pathname.adminSeller, isVisible: true}),
        CreateNavigation({title: RouteTitle.buyers, icon: BuildingIconWhite, path: Pathname.adminBuyer, isVisible: true}),
        CreateNavigation({title: RouteTitle.mandate, icon: MandateNavigationIcon, path: Pathname.adminMandate, isVisible: true}),
        CreateNavigation({title: RouteTitle.deals, icon: DealsIcon, path: Pathname.adminDeals, isVisible: true}),
        CreateNavigation({title: RouteTitle.offPlatform, icon: OffplatformIcon, path: Pathname.offplatform, isVisible: true}),
        // CreateNavigation({title: RouteTitle.notification, icon: BellIcon, path: ''}),
    ],
    bottomNavigation: [
        CreateNavigation({title: RouteTitle.logout, iconComp: <PowerSettingsNewIcon sx={{color: '#fff'}} />, hasAction: true, action: () => handleLogoutUser('/admin/login')}),
    ]
}