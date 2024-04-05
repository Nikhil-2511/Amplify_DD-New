import store from "../../../Redux";
import { getAppBaseUrl, getAuthBasedUrl, getDate, getValueFromArr } from "../../../helper/commonHelper";

export function BuyerDefaultMandatesTableModel() {

    return (
        {
            headers: [
                {
                    label: 'Mandate ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Name',
                    sx: {width: '40%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Sector',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Created on',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Prospects',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Active Deals',
                    sx: {},
                    className: '',
                    style: {}
                }
            ],
            tableContent: [
                {
                    key: 'id',
                    hasCustomData: true
                },
                { 
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'sector',
                },
                { 
                    key: 'createdAt',
                },
                {
                    key: 'viewedDealCount',
                },
                {
                    key: 'activeDealCount'
                },
            ]
        }
    )
}

export function BuyerUpdateMandateModel(dataResponse, handleRefresh) {
    let id = (
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}mandate/${dataResponse.uid}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`M${dataResponse?.id}`}</a>
        </span>
    )
    let sector = '';

    if(dataResponse?.preferences?.length){
        dataResponse?.preferences.forEach(prefrenceList => {
            sector += prefrenceList?.sector;
            if(prefrenceList?.subsector) sector += ` > ${prefrenceList?.subsector}`;
            
        });
    }

    let sectorDetails = (
        <div className={`custom-chip bg-F9F5FF`}>
            <span className="text-12 font-500 text-6941C6">{sector}</span>
        </div>
    )

    let mandateType = (
        <div className={`custom-chip bg-ECFDF3`}>
            <span className="text-12 font-500 text-027A48">{dataResponse?.status ? 'Active' : 'Passive'}</span>
        </div>
    )

    return {
        'id': id,
        'name': dataResponse?.name,
        'sector': sector ? sectorDetails : '',
        'createdAt': getDate(dataResponse.createdAt),
        'activeDealCount': dataResponse?.activeDealCount || 0,
        'viewedDealCount': dataResponse?.viewDealCount || 0
    }
}