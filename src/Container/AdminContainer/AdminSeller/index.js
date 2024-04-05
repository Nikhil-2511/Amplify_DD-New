import React, { useEffect, useState } from 'react';
import { RecommendedSellertListingTabData, SellerTabData } from '../../../CommonModels/TabModels';
import { UpdateRecommendedListModel, UpdateSellerModel } from './SellerDataModel';
import { ENDPOINT } from '../../../config/endpoint';
import WrappedWithFilters from '../../../HOC/WrappedWithFilters';
import { SellerSortByArr } from '../../../CommonModels/CommonCollection';
import { useDispatch } from 'react-redux';
import RecommendedSeller from '../../../Component/RecommendedCompanies/RecommendedSeller';
import { RecommendedSellerListingTableData } from './TableModel';
import { updateAppHeaderState } from '../../../Redux/slice/AppNavigationSlice';

function AdminSeller() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAppHeaderState(false));
    }, [])

    return (
        <WrappedWithFilters
            apiUrl={ENDPOINT.BUYERS.buyerListing}
            pageTitle="Sellers"
            modifyResponseElement={UpdateSellerModel}
            tabData={SellerTabData()}
            hasPageFilter={true}
            hasRefreshApi={true}
            sortByArr={SellerSortByArr}
            resetSortByOnSearch={true}
            defaultSortBy={{
                direction: 'DESC',
                fieldName: 'updatedAt',
            }}
            // hasNavigation={true}
            // path='/admin-user/dashboard'
        />
    )
}

export default AdminSeller;