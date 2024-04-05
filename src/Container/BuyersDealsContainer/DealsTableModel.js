import { Chip, Stack } from "@mui/material";
import { getAppBaseUrl, getAuthBasedUrl, getDate, getValueFromArr } from "../../helper/commonHelper";
import { AllDealsArr } from "../../CommonModels/CommonCollection";
import store from "../../Redux";
import { EXPRESS_INTEREST_KEY, RUPEE_SYMBOL } from "../../constants";
import InterestAction from "../../Component/InterestAction";

export function DefaultDealsTableModel() {
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
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                // {
                //     label: 'Sell-side Owner',
                //     sx: {},
                //     className: '',
                //     style: {}
                // },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
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
                    label: 'Last Activity',
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
                    key: 'sellerName',
                    hasCustomData: true
                },
                { 
                    key: 'sellerDescription',
                },
                // { 
                //     key: 'sellSideOwner',
                // },
                { 
                    key: 'ttmRevenue',
                    hasCurrency: true
                },
                { 
                    key: 'status',
                },
                { 
                    key: 'updatedAt',
                },
            ]
        }
    )
}

export function InterestSentDealsTableModel() {
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
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                // {
                //     label: 'Sell-side Owner',
                //     sx: {},
                //     className: '',
                //     style: {}
                // },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Last Activity',
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
                    key: 'sellerName',
                    hasCustomData: true
                },
                { 
                    key: 'sellerDescription',
                },
                // { 
                //     key: 'sellSideOwner',
                // },
                { 
                    key: 'ttmRevenue',
                    hasCurrency: true
                },
                { 
                    key: 'updatedAt',
                },
            ]
        }
    )
}

export function ShortlistedDealsTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Seller',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '40%'},
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
                    label: 'Action',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                { 
                    key: 'sellerDetails',
                    hasCustomData: true
                },
                { 
                    key: 'sellerDescription',
                },
                // { 
                //     key: 'sellSideOwner',
                // },
                { 
                    key: 'ttmRevenue',
                    hasCurrency: true
                },
                { 
                    key: 'action',
                },
            ]
        }
    )
}

export function UpdateDealsModel(dataResponse, handleRefresh) {
    let name = (<Stack direction={'column'} >
        <div className="text-667085 text-14"><span className="font-600 ">{dataResponse.category}</span><span className="margin-l8 text-667085">{dataResponse.subCategory}</span></div>
        <div className="text-14 text-667085">{`S${dataResponse?.sellerId}`}</div>
    </Stack>);

    // Will use in future 
    /* let description = (
        <Stack direction={'column'} >
        <div className="text-14">
            <span className="margin-l8 text-black">{`S${dataResponse?.id}`}</span>
        </div>
        <div className="text-667085 text-14"><span className="font-600">{dataResponse?.sellerDescription}</span><span>{dataResponse?.subCategory}</span> </div>
    </Stack>
    ) */
    let status = (
        dataResponse.dealStatus ? <Chip label={getValueFromArr(dataResponse.dealStatus, AllDealsArr)} /> : ''
    )
    let dealId = (
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}cue-card/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`D${dataResponse?.id}`}</a>
        </span>
    )

    let sellerDetails = (
        <Stack direction={'column'}>
            <span className="text-2E90FA">
                <a href={`${getAuthBasedUrl()}cue-card/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`S${dataResponse?.sellerId}`}</a>
            </span>
            <span>
            <div className="text-667085 text-14"><span className="font-600 ">{dataResponse?.category}</span><span className="margin-l8 text-667085">{dataResponse?.subCategory || ''} {dataResponse?.othersSubCategory || ''}</span></div>
            </span>
        </Stack>
    )
    
    return {
        'id': dealId,
        'sellerName': name,
        'sellerDescription': dataResponse?.sellerDescription,
        'ttmRevenue': dataResponse?.ttmRevenue,
        // 'buySideOwner': getValueFromArr(dataResponse?.buySideOwner, (store.getState()?.authorizationStore?.adminUsersList || [])),
        'createdAt' : getDate(dataResponse.createdAt),
        'status': status,
        'updatedAt': getDate(dataResponse.updatedAt),
        'navigationId': dataResponse.companyId,
        'sellerDetails': sellerDetails,
        'action': <InterestAction data={dataResponse} id={dataResponse?.sellerId} className="bg-black text-white font-500 text-12" handleSuccess={handleRefresh} actionType={EXPRESS_INTEREST_KEY} label="Express Interest"/>
    }
}