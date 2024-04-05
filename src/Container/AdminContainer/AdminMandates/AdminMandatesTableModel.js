import store from "../../../Redux";
import { getAppBaseUrl, getAuthBasedUrl, getDate, getValueFromArr } from "../../../helper/commonHelper";
import VerifiedStatusIcon from '../../../assets/images/verifiedStatusIcon.svg';

export function AdminDefaultMandatesTableModel() {
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
                    label: 'Buyer',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Name',
                    sx: {width: '20%'},
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
                    label: 'Mandate Type',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Deal Partner',
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
                },
                {
                    label: 'Created on',
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
                    key: 'buyerId'
                },
                { 
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'sector',
                },
                { 
                    key: 'mandateType',
                },
                { 
                    key: 'dealPartner',
                },
                {
                    key: 'viewDealCount',
                },
                {
                    key: 'activeDealCount'
                },
                { 
                    key: 'createdAt',
                },
            ]
        }
    )
}

export function AdminUpdateMandateModel(dataResponse, handleRefresh) {
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

    let prospectElement=(
        <div className="prospects-recommended">
          <span> {dataResponse?.viewDealCount || 0}</span>
          {
            dataResponse.newRecommendations && <img className="w-[25px] h-[25px]" src={VerifiedStatusIcon} />
          }
        </div>
    )

    return {
        'id': id,
        'buyerId': `B${dataResponse?.buyerid}`,
        'name': dataResponse?.name,
        'sector': sector ? sectorDetails : '',
        'mandateType': mandateType,
        'dealPartner': getValueFromArr(dataResponse.owner, (store.getState()?.authorizationStore?.adminUsersList || [])),
        'createdAt': getDate(dataResponse.createdAt),
        'viewDealCount': prospectElement,
        'activeDealCount':dataResponse?.activeDealCount || 0,
    }
}