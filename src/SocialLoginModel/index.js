import { STATE } from "../constants"
import { getAppBaseUrl } from "../helper/commonHelper"
import LinkedinWhiteIcon from '../assets/images/LinkedInWhiteIcon.png';
import LinkedinIconGrey from '../assets/images/LinkedInGreyIcon.png';
import { GA_CL_ID } from "../config";

function linkedInModel() {
    return function () {
        return {
            clientID: '77ivp7o9flcadg',
            // clientID: '77fi9pno88lmcu',
            redirectUri: getAppBaseUrl() + 'social-auth-login',
            state: STATE,
            scope: 'r_liteprofile%20r_emailaddress',
            externalLink: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
            label: 'Sign up with LinkedIn',
            activeIcon: LinkedinWhiteIcon,
            inActiveIcon: LinkedinIconGrey
        }
    }
}

export function GASignupModel() {
        return {
            clientID: GA_CL_ID,
            redirectUri: getAppBaseUrl() + 'analytics',
            scope: "https://www.googleapis.com/auth/analytics.readonly%20https://www.googleapis.com/auth/analytics.edit",
            externalLink: 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount',
            accessType: 'offline',
            responseType: 'code',
            prompt : 'consent'
        }
}



export const SocialLoginModel = [
    {
        socialDetails: linkedInModel()
    }
]