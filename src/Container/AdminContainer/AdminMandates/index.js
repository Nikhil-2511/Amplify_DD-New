import React from 'react';
import WrappedWithFilters from '../../../HOC/WrappedWithFilters';
import { ENDPOINT } from '../../../config/endpoint';
import { AdminUpdateMandateModel } from './AdminMandatesTableModel';
import { AdminMandatesTabModel } from './AdminMandatesTabModel';

function AdminMandatesContainer() {
    return (
        <div>
            <WrappedWithFilters
                apiUrl={ENDPOINT.MANDATES.getMandateAPi}
                pageTitle="Mandates"
                modifyResponseElement={AdminUpdateMandateModel}
                tabData={AdminMandatesTabModel()}
                hasRefreshApi={true}
                hideSortBy={true}
                hasPageFilter={true}
                defaultSortBy={{
                    direction: 'DESC',
                    fieldName: 'updatedAt',
                }}
                hideTabs={true}
            />
        </div>
    )
}

export default AdminMandatesContainer;