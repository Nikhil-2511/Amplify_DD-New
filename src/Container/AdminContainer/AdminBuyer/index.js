import React, { useEffect } from 'react';
import { BuyerTabData } from '../../../CommonModels/TabModels';
import { UpdateBuyerModel } from './BuyerDataModel';
import WrappedWithFilters from '../../../HOC/WrappedWithFilters';
import { ENDPOINT } from '../../../config/endpoint';
import { useDispatch } from 'react-redux';
import FormActionModalContainer from './CreateBuyerComponent.js';
import { AdminBuyerSortByArr } from '../../../CommonModels/CommonCollection';
import { updateAppHeaderState } from '../../../Redux/slice/AppNavigationSlice';

function AdminBuyer() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAppHeaderState(false));
    }, [])

    function customAction(handleRefresh) {
        return (
            <FormActionModalContainer handleRefresh={handleRefresh} />
        )
    }
    
    return (
        <WrappedWithFilters
            apiUrl={ENDPOINT.BUYERS.getBuyerListApi}
            pageTitle="Buyers"
            modifyResponseElement={UpdateBuyerModel}
            tabData={BuyerTabData()}
            hasPageFilter={true}
            // hasNavigation={true}
            // path='profile-page'
            sortByArr={AdminBuyerSortByArr}
            defaultSortBy={{
                direction: 'DESC',
                fieldName: 'updatedAt',
            }}
            customActionComponent={customAction}
            // showCreateMandateCTA={true}
        />
    )
}

export default AdminBuyer;