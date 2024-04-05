import { getDate, getValueFromArr, renderIconBasedOnDeals } from "../../helper/commonHelper";
import SellerDealsAction from "./SellerDealsAction";
import store from "../../Redux";
import { AllDealsArr } from "../../CommonModels/CommonCollection";
import ReadMoreComponent from "./SellerInvestorNote";


export function SellerInterestModel() {
    return (
        {
            headers: [
                {
                    label: 'Buyer Name',
                    sx: {width: '20%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '20%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Investor’s Message',
                    sx: {width: '20%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Request Received',
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
                    key: 'name',
                    hasCustomData: true
                },
                { 
                    key: 'description',
                    hasCustomData: true
                },
                { 
                    key: 'interactionNotes',
                },
                { 
                    key: 'updatedAt',
                },
                { 
                    key: 'dealAction',
                },
            ]
        }
    )
}


export function SellerActiveDealsModel() {
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
                    label: 'Buyer Name',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Description',
                    sx: {width: '20%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Investor’s Message',
                    sx: {width: '20%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Deal Status',
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
                    key: 'name'
                },
                { 
                    key: 'description',
                    hasCustomData: true
                },
                { 
                    key: 'interactionNotes',
                },
                { 
                    key: 'status',
                },
                { 
                    key: 'buySideOwner',
                },
                { 
                    key: 'updatedAt',
                },
            ]
        }
    )
}



export function SellerUpdateDealsModel(dataResponse, handleRefresh) {
    let buyerName = (
        <span className="text-2E90FA flex col-gap-8">
            {renderIconBasedOnDeals(dataResponse?.objective)}
            <span>{dataResponse?.buyerName}</span>
        </span>
    )
    return {
        'name': buyerName,
        'description': dataResponse?.buyerDescription,
        'updatedAt': getDate(dataResponse.updatedAt, 'DD-MM-YYYY'),
        'id': `D${dataResponse?.id}`,
        'buySideOwner': getValueFromArr(dataResponse?.buySideOwner, (store.getState()?.authorizationStore?.adminUsersList || [])),
        'status': getValueFromArr(dataResponse?.dealStatus, AllDealsArr),
        'createdAt': dataResponse.createdAt,
        'dealAction': <SellerDealsAction actionData={dataResponse} handleRefresh={handleRefresh}  />,
        'interactionNotes': <ReadMoreComponent investorNote={dataResponse?.investorNote} />,
        'objective': dataResponse?.objective,
        'interactionNotesMobile': dataResponse?.investorNote?.description
    }
}