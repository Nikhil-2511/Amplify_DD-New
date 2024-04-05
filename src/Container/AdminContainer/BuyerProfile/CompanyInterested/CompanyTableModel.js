import { Chip, Stack } from "@mui/material";
import { RUPEE_SYMBOL } from "../../../../constants";
import { getAppBaseUrl, getAuthBasedUrl, getDate, getValuationValue, getValueFromArr } from "../../../../helper/commonHelper";
import { AllDealsArr, EbitdaPositiveArr } from "../../../../CommonModels/CommonCollection";

export function CompanyInterestedTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Deal ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Seller',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EBITDA Positive',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Ask Price(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Request Sent',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'id',
                    hasCustomData: true
                },
                {
                    key: 'sellerDetails',
                    hasCustomData: true
                },
                { 
                    key: 'description',
                    hasCustomData: true
                },
                { 
                    key: 'ttmNet',
                    hasCurrency: true
                },
                { 
                    key: 'ebitda',
                },
                { 
                    key: 'askPrice',
                },
                { 
                    key: 'requestSent',
                },
            ]
        }
    )
}

export function ViewedCompanyTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Deal ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Seller',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'EBITDA Positive',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Status`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Last viewed',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'id',
                    hasCustomData: true
                },
                {
                    key: 'sellerDetails',
                    hasCustomData: true
                },
                { 
                    key: 'description',
                    hasCustomData: true
                },
                { 
                    key: 'ttmNet',
                    hasCurrency: true
                },
                { 
                    key: 'ebitda',
                },
                { 
                    key: 'dealStatus',
                },
                { 
                    key: 'requestSent',
                },
            ]
        }
    )
}

export function UpdateCIModel(dataResponse) {
    let sellerDetails = (<Stack direction={'column'} >
        <div className="text-14">
            <span className="text-2E90FA">
                <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`${dataResponse?.sellerName}`}</a>
            </span>
        </div>
        <div className="text-667085 text-14"><span className="text-667085 font-600">{dataResponse?.category}</span> <span>{dataResponse?.subCategory}</span></div>
    </Stack>);

    // Will use in future 
    let description = (
        <Stack direction={'column'} >
        <div className="text-14">
            <span className="margin-l8 text-black">{`S${dataResponse?.id}`}</span>
        </div>
        <div className="text-667085 font-600 text-14">{dataResponse.sellerDescription}</div>
    </Stack>
    )

    let idKey = (<Stack direction={'column'} >
        <div className="text-14">
            <span className="text-2E90FA">
                <a href={`${getAuthBasedUrl()}cue-card/${dataResponse.companyId}`} rel="noreferrer" target="_blank"  className="text-2E90FA font-500">{`D${dataResponse?.id}`}</a>
            </span>
        </div>
    </Stack>);

    return {
        'id': idKey,
        'sellerDetails': sellerDetails,
        'description': dataResponse.sellerDescription,
        'ttmNet': dataResponse.ttmRevenue,
        'ebitda': getValueFromArr(dataResponse.ebitda, EbitdaPositiveArr),
        'askPrice': dataResponse.askPrice ? getValuationValue(dataResponse.askPrice) : 'To be discussed',
        'requestSent' : getDate(dataResponse.createdAt),
        'updatedAt': dataResponse.updatedAt,
    }
}


export function UpdateVCModel(dataResponse) {
    let sellerDetails = (<Stack direction={'column'} >
        <div className="text-14">
            <span className="text-2E90FA">
                <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`${dataResponse?.sellerName}`}</a>
            </span>
        </div>
        <div className="text-667085 text-14"><span className="text-667085 font-600">{dataResponse?.category}</span> <span>{dataResponse?.subCategory}</span></div>
    </Stack>);

    // Will use in future 
    let description = (
        <Stack direction={'column'} >
        <div className="text-14">
            <span className="margin-l8 text-black">{`S${dataResponse?.id}`}</span>
        </div>
        <div className="text-667085 font-600 text-14">{dataResponse.sellerDescription}</div>
    </Stack>
    )

    let status = (
        dataResponse.dealStatus ? <Chip label={getValueFromArr(dataResponse.dealStatus, AllDealsArr)} /> : ''
    )

    let idKey = (<Stack direction={'column'} >
        <div className="text-14">
            <span className="text-2E90FA">
                <a href={`${getAppBaseUrl()}admin/cue-card/${dataResponse.companyId}`} rel="noreferrer" target="_blank"  className="text-2E90FA font-500">{`D${dataResponse?.id}`}</a>
            </span>
        </div>
    </Stack>);

    return {
        'id': idKey,
        'sellerDetails': sellerDetails,
        'description': dataResponse?.sellerDescription,
        'ttmNet': dataResponse?.ttmRevenue,
        'ebitda': getValueFromArr(dataResponse.ebitda, EbitdaPositiveArr),
        'askPrice': dataResponse.askPrice ? getValuationValue(dataResponse.askPrice) : 'To be discussed',
        'requestSent' : getDate(dataResponse.createdAt),
        'updatedAt': dataResponse?.updatedAt,
        'dealStatus': status
    }
}