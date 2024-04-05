import { newCuecardFinancialIcon, newCuecardOthersIcon, newCuecardProfileIcon } from "../../../assets/icons/svgIcons";
import { COMPANY_KEY } from "../../../constants";
import { AUDIT_KEY, CAPTABLE_KEY, CREDIT_RATING, FINANCIAL_KEY, GST_FILING_KEY, ITR_KEY, MIS_KEY, OTHERS_KEY, PITCHDECK_KEY, REGISTRATIONS_AND_LICENSES_KEY } from "../../../constants/keyVariableConstants";

export const CuecardDataroomModel = {
    [COMPANY_KEY]: {
        label: 'Company',
        icon: newCuecardProfileIcon,
        subSections: {
            [PITCHDECK_KEY]: {
                label: 'Pitchdeck',    
            },
            [CAPTABLE_KEY]: {
                label: 'Cap Table and Board Profile',
            },
            [REGISTRATIONS_AND_LICENSES_KEY]: {
                label: 'Registration & Licenses',
            },
        }
    },
    [FINANCIAL_KEY]: {
        label: 'Financials',
        icon: newCuecardFinancialIcon,
        subSections: {
            [AUDIT_KEY]: {
                label: 'Audited Financials'
            },
            [MIS_KEY]: {
                label: 'MIS',
            },
            [ITR_KEY]: {
                label: 'ITR'
            },
            [GST_FILING_KEY]: {
                label: 'GST Filing'
            },
        }
    },
    [OTHERS_KEY]: {
        label: 'Others',
        icon: newCuecardOthersIcon,
        subSections: {
            [CREDIT_RATING]: {
                label: 'Credit rating'
            }
        }
    }
}