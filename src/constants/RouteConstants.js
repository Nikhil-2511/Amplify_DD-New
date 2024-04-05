export const Pathname = {
    buyer: 'buyer',
    sellers: 'sellers',
    dashboard: 'dashboard',
    browseScreen: '/buyer/browse',
    buyerDeals: '/buyer/deals',
    buyerProfile: '/buyer/profile',
    adminDeals: '/admin/deals',
    adminSeller: '/admin/seller',
    adminBuyer: '/admin/buyer',
    adminMandate: '/admin/mandate',
    buyerMandate: '/buyer/mandate',
    offplatform: '/admin/offplatform'

}

export const RouteTitle = {
    buyerHome: 'Home',
    buyers: 'Buyers',
    sellers: 'Sellers',
    deals: 'Deals',
    notification: 'Notification',
    logout: 'Logout',
    adminHome: '',
    browse: 'Browse',
    profile: 'Profile',
    mandate: 'Mandate',
    offPlatform: 'Off Platform'
}

export const UserBasedProtectedRoutes = {
    '1': [
        '/dashboard',
        '/deals',
        '/dashboard?elvisible=true'
    ],
    '2': [
        '/admin/seller',
        '/admin/buyer',
        '/admin/deals',
        '/buyer/profile-page/',
    ],
    '3': [
        '/buyer/deals',
        '/buyer/browse',
        '/buyer/profile'
    ]
}