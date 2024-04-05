import React from 'react';
import { AdminDefaultDealsTableModel, AdminUpdateDealsModel } from './AdminDealsTableModel';
import { SECTOR, STATUS } from '../../../constants';
import { ENDPOINT } from '../../../config/endpoint';
import WrappedWithFilters from '../../../HOC/WrappedWithFilters/index.js';
import { AdminDealsTabData } from './AdminDealsTabModel';
import { DealsFilterModel } from '../../../CommonModels/FilterModel';
import { AdminDealsSortByArr } from '../../../CommonModels/CommonCollection';

function AdminDealsContainer() {
    return (
        <WrappedWithFilters
            apiUrl={ENDPOINT.DEALS.getBuyerDealsApi}
            pageTitle="Deals"
            modifyResponseElement={AdminUpdateDealsModel}
            tabData={AdminDealsTabData()}
            hasRefreshApi={true}
            // hideSortBy={true}
            hasPageFilter={true}
            defaultSortBy={{
                direction: 'DESC',
                fieldName: 'updatedAt',
            }}
            sortByArr={AdminDealsSortByArr}
            // hideTabs
        />
    )
}

export default AdminDealsContainer;