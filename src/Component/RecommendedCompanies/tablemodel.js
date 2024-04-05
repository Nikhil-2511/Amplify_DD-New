import { Chip, Stack } from "@mui/material";
import { RUPEE_SYMBOL } from "../../constants";
import { getAppBaseUrl, getAuthBasedUrl, getValueFromArr } from "../../helper/commonHelper";
import { AllDealsArr } from "../../CommonModels/CommonCollection";
import RecommendedAction from "./RecommendedAction";

export function RecommendedCompanyTableModel() {
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



export function UpdateRMModel(dataResponse, handleRefresh) {
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

    return {
        'sellerId': idKey,
        'sellerName': sellerDetail,
        'description': dataResponse?.objectData?.about,
        'ttmNet': dataResponse?.objectData?.ttmCalculated,
        'suggestedBy': dataResponse?.suggestedBy,
        'updatedAt': dataResponse?.updatedAt,
        'dealStatus': getValueFromArr(dataResponse.dealStatus, AllDealsArr),
        'action': <RecommendedAction apiData={dataResponse} handleRefresh={handleRefresh} user="Seller" />
    }
}