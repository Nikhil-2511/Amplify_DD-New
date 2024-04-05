import { Stack } from "@mui/system";
import { getAppBaseUrl, getAuthBasedUrl, getValueFromArr } from "../../helper/commonHelper";
import RecommendedListingAction from "../../Component/RecommendedCompanies/RecommendedSeller/RecommendedListingAction";
import RecommendedAction from "../../Component/RecommendedCompanies/RecommendedAction";
import { AllDealsArr } from "../../CommonModels/CommonCollection";


export function SellerRecommendedTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Buyer ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buyer Details',
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
                {
                    label: `Preference Sector`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Recommended by',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Deal Status`,
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
                    key: 'buyerId',
                    hasCustomData: true
                },
                {
                    key: 'buyerName',
                    hasCustomData: true
                },
                { 
                    key: 'description',
                    hasCustomData: true
                },
                { 
                    key: 'prefrences',
                },
                { 
                    key: 'suggestedBy',
                },
                { 
                    key: 'dealStatus',
                },
                { 
                    key: 'action',
                },
            ]
        }
    )
}


export function RecommendedSellerListingTableData() {
    return (
        {
            headers: [
                {
                    label: 'Buyer ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buyer Details',
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
                    label: `Preference Sector`,
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
                    key: 'buyerId',
                    hasCustomData: true
                },
                {
                    key: 'buyerName',
                    hasCustomData: true
                },
                { 
                    key: 'description',
                    hasCustomData: true
                },
                { 
                    key: 'prefrenceSector'
                },
                { 
                    key: 'action',
                },
            ]
        }
    )
}



export function UpdateSellerRMModel(dataResponse, handleRefresh) {
    let idKey = (
            <span className="text-2E90FA">
                <a href={`${getAuthBasedUrl()}buyer/profile-page/${dataResponse?.objectData?.uid}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`B${dataResponse?.buyerId}`}</a>
            </span>);

    let sellerDetail = (<Stack direction={'column'} >
    <div className="text-14">
        <span className="text-667085">
            {`${dataResponse?.objectData?.companyName}`}
        </span>
    </div>
    </Stack>);

    // // Will use in future 
    // let description = (
    //     <Stack direction={'column'} >
    //     <div className="text-14">
    //         <span className="margin-l8 text-black">{`S${dataResponse?.id}`}</span>
    //     </div>
    //     <div className="text-667085 font-600 text-14">{dataResponse?.sellerDescription}</div>
    // </Stack>
    // )

    // let status = (
    //     dataResponse.dealStatus ? <Chip label={getValueFromArr(dataResponse.dealStatus, AllDealsArr)} /> : ''
    // )

    let preferences = [];
    if(dataResponse?.objectData?.preferences?.length) {
        preferences = dataResponse.objectData.preferences.map((preferenceList) => preferenceList.sector || '');
    }

    return {
        'buyerId': idKey,
        'buyerName': sellerDetail,
        'description': dataResponse?.objectData?.description,
        'suggestedBy': dataResponse?.suggestedBy,
        'updatedAt': dataResponse?.updatedAt,
        'dealStatus': getValueFromArr(dataResponse.dealStatus, AllDealsArr),
        'prefrences': preferences.join(', '),
        'action': <RecommendedAction apiData={dataResponse} handleRefresh={handleRefresh} primaryIdType="seller" user="Seller"/>
    }
}

export function UpdateSellerNotesRecommendedListModel (dataResponse) {
    let idKey = (
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}buyer/profile-page/${dataResponse?.objectData?.uid}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`B${dataResponse?.buyerId}`}</a>
        </span>);

    let buyerDetails = (<Stack direction={'column'} >
    <div className="text-14">
        <span className="text-667085">
            {`${dataResponse?.objectData?.companyName}`}
        </span>
    </div>
    <div className="text-667085 text-14"><span className="text-667085 font-600">{dataResponse?.objectData?.category}</span> <span>{dataResponse?.objectData?.subCategory}</span></div>
    </Stack>);

    let preferences = [];
    if(dataResponse?.objectData?.preferences?.length) {
        preferences = dataResponse.objectData.preferences.map((preferenceList) => preferenceList.sector || '');
    }

    return {
        'buyerId': idKey,
        'buyerName': buyerDetails,
        'description': dataResponse?.objectData?.description,
        'prefrenceSector': preferences.join(', '),
        'action': <RecommendedListingAction apiData={dataResponse} defaultObj={{"primaryIdType": 'seller', "buyerId": dataResponse.buyerId}} />
    }
}