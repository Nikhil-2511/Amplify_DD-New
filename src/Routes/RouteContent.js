import { createBrowserRouter } from "react-router-dom";
import BuyersContainer from "../Container/BuyersContainer";
import QuestionScreen from "../Container/QuestionScreen";
import Signup from "../Component/Signup";
import Valuation from "../Component/Valuation";
import Dashboard from "../Container/Dashboard";
import CueCard from "../Container/CueCard";
import QuestionnaireFillerScreen from "../Component/QuestionnaireFillerScreen";

export const sellerRoutes = {
    valq: 'valq',
    login: 'login',
    signup: 'signup',
    valuation: 'valuation',
    dashboard: 'dashboard',
    cueCardCompany: 'cue-card/:companyId',
    intro: 'intro',
    buyer: 'buyer',
    listing: 'listing'

}

export const BuyerRoutes = [
    {
        path: 'buyer',
        element: <BuyersContainer />
    }
]

export const AdminRoutes = [

]

export const router = createBrowserRouter([
    {
      path: "/",
      element: '',
    },
    {
        path: 'valq',
        element: <QuestionScreen />
    },
    {
        path: 'login',
        element: <Signup key="login" />
    },
    {
        path: 'signup',
        element: <Signup key="signup" />
    },
    {
        path: 'valuation',
        element: <Valuation />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'cue-card/:companyId',
        element: <CueCard />
    },
    {
        path: 'intro',
        element: <QuestionnaireFillerScreen />
    },
    {
        path: '*',
        element: CustomRouter()
    }
  ]);