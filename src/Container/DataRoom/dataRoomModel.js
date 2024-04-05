import { ENDPOINT } from "../../config/endpoint";
import { COMPANY_KEY } from "../../constants";
import { AUDIT_KEY, CAPTABLE_KEY, CREDIT_RATING, FINANCIAL_KEY, GST_FILING_KEY, ITR_KEY, MIS_KEY, OTHERS_KEY, PITCHDECK_KEY, REGISTRATIONS_AND_LICENSES_KEY,} from "../../constants/keyVariableConstants";

export const DataRoomModel = {
    [COMPANY_KEY]: {
        label: 'Company Information',
        key: COMPANY_KEY,
        docType: [PITCHDECK_KEY, CAPTABLE_KEY, REGISTRATIONS_AND_LICENSES_KEY]
    },
    [FINANCIAL_KEY]: {
        label: 'Financial Information',
        key: FINANCIAL_KEY,
        docType: [AUDIT_KEY, ITR_KEY, GST_FILING_KEY]
    },
    [OTHERS_KEY]: {
        label: 'Others',
        key: OTHERS_KEY,
        docType: [CREDIT_RATING]
    }
    // 'revenue': {
    //     label: 'Revenue Information'
    // },
    // 'tax': {
    //     label: 'Tax'
    // },
    // 'legal': {
    //     label: 'Legal'
    // }
}

export const Subsections = {
    [COMPANY_KEY]: {
        [PITCHDECK_KEY]: {
            label: 'Pitchdeck',
            key: PITCHDECK_KEY,
            title: 'Pitchdeck',
            description: 'Your pitch deck is a concise presentation of your company you present to investors. A good pitchdeck contains your mission, objectives, business model, financials and your vision of the future.',

        },
        [CAPTABLE_KEY]: {
            label: 'Cap Table and Board Profile',
            title: 'Cap Table and Board Profile',
            key: CAPTABLE_KEY,
            description: `Upload your Cap Table, Funding History, and Board of Director's Profiles as outlined in the provided template.`,
            hasDownloadTemplate: true,
            apiUrl: ENDPOINT.DOCUMENT.appDownload(),
            fileType: {key: '.xls, .xlsx', displayValue: 'XLS/XLSX'}
        },
        [REGISTRATIONS_AND_LICENSES_KEY]: {
            label: 'Registration & Licenses',
            title: 'Registration & Licenses',
            key: REGISTRATIONS_AND_LICENSES_KEY,
            description: 'Upload registration and license documents for your company, including Company PAN, GST, Articles of Association (AoA), Memorandum of Association (MoA), Certificate of Incorporation, Company TAN, and other relevant documents.'
        },
    }
    ,
    [FINANCIAL_KEY]: {
        [AUDIT_KEY]: {
            label: 'Audited Financials',
            key: AUDIT_KEY,
            title: 'Audited Financials',
            description: `Upload your audited financials for all past years, each approved by a qualified auditor, to validate your financial history and compliance.`
        },
        [MIS_KEY]: {
            label: 'MIS',
            key: MIS_KEY,
            title: 'MIS',
            description: `Upload your company's MIS (Management Information System), including historical, current, and projected balance sheets, using the provided template.`,
            hasDownloadTemplate: true,
            apiUrl: ENDPOINT.DOCUMENT.appDownload(),
            fileType: '.xls, .xlsx',
            fileType: {key: '.xls, .xlsx', displayValue: 'XLS/XLSX'}
        },
        [ITR_KEY]: {
            label: 'ITR',
            key: ITR_KEY,
            title: 'ITR Filing',
            description: `Upload your company's previous Income Tax Return (ITR) filing.`
        },
        [GST_FILING_KEY]: {
            label: 'GST Filing',
            key: GST_FILING_KEY,
            title: 'GST Filing',
            description: `Upload your company's GST filing.`
        },
    },
    [OTHERS_KEY]: {
        [CREDIT_RATING]: {
            label: 'Credit rating',
            key: CREDIT_RATING,
            title: 'Credit rating',
            description: `Upload your company's credit rating reports, audited by an independent third party.`
        }
    }
}