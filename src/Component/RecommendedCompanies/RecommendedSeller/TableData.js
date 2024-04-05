import { Stack } from "@mui/material";
import { RUPEE_SYMBOL } from "../../../constants";
import RecommendedListingAction from "./RecommendedListingAction";
import { getAppBaseUrl, getAuthBasedUrl } from "../../../helper/commonHelper";

export function recommendedSellerTableData() {
    return (
        {
            headers: [
                {
                    label: 'Seller ID',
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
                    sx: {width: '30%'},
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
                    key: 'sellerId',
                    hasCustomData: true
                },
                {
                    key: 'sellerName',
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
                    key: 'action',
                },
            ]
        }
    )
}

export function UpdateRecommendedListModel(dataResponse, handleRefresh, selectedTab, inputValue) {
    let idKey = (
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}cue-card/${dataResponse?.objectData?.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`S${dataResponse?.sellerId}`}</a>
        </span>);

    let sellerDetail = (<Stack direction={'column'} >
    <div className="text-14">
        <span className="text-2E90FA">
            <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse?.objectData?.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`${dataResponse?.objectData?.name}`}</a>
        </span>
    </div>
    <div className="text-667085 text-14"><span className="text-667085 font-600">{dataResponse?.objectData?.category}</span> <span>{dataResponse?.objectData?.subCategory}</span></div>
    </Stack>);


    return {
        'sellerId': idKey,
        'sellerName': sellerDetail,
        'description': dataResponse?.objectData?.about,
        'ttmNet': dataResponse?.objectData?.ttmCalculated,
        'action': <RecommendedListingAction apiData={dataResponse} selectedTab={selectedTab} inputValue={inputValue} defaultObj={{"primaryIdType": 'buyer', "sellerId": dataResponse.sellerId}} />
    }
}