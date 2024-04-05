import React from 'react';
import { DealsTabData, MobileDealsTabData } from './DealsTabModel';
import { UpdateDealsModel } from './DealsTableModel';
import WrappedWithFilters from '../../HOC/WrappedWithFilters/index.js';
import { ENDPOINT } from '../../config/endpoint';
import { SECTOR, STATUS } from '../../constants';
import { isMobileView } from '../../helper/commonHelper';
import MobileCardView from '../../Component/MobileCardView/index.js';

const visibleFilters = [STATUS];

function BuyerDealsContainer(props) {

    function renderMobileViewComponent(props) {
        return (
            <div className='list-card-container'>
                <MobileCardView {...props} isBuyerDeals={true} />
            </div>
        )
    }
    return (
        <WrappedWithFilters
            apiUrl={ENDPOINT.DEALS.getBuyerDealsApi}
            pageTitle="My Deals"
            modifyResponseElement={UpdateDealsModel}
            tabData={isMobileView() ? MobileDealsTabData() : DealsTabData()}
            hasPageFilter={true}
            hideSortBy={true}
            hasRefreshApi={true}
            mobileViewComponent={renderMobileViewComponent}
            rawData={true}
            // hasNavigation={true}
            // path='/buyer/cue-card'
        />
    )
}

export default BuyerDealsContainer;