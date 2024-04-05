import Valuation from "../../Component/Valuation"
import AdminListing from "../AdminListing"
import CueCard from "../CueCard"
import Dashboard from "../Dashboard"
import QuestionScreen from "../QuestionScreen"

export const RoutePath = {
  dashborad: '/dashboard',
  valuation: '/valuation',
  cueCard: `/cue-card/:companyId`,
  adminListing: `/admin-listing`
}
export const RouteData = {
  content: [
    {
      route: RoutePath.dashborad,
      component: Dashboard,
      admin: true,
      endUser: true
    },
    {
      route: RoutePath.valuation,
      component: Valuation,
      endUser: true
    },
    {
      route: RoutePath.cueCard,
      component: CueCard,
      admin: true,
      endUser: false
    },
    {
      route: RoutePath.adminListing,
      component: AdminListing,
      admin: true,
      endUser: false
    },
  ] 
}