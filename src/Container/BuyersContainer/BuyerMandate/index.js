import React from 'react';
import WrappedWithFilters from '../../../HOC/WrappedWithFilters';
import { ENDPOINT } from '../../../config/endpoint';
import { BuyerUpdateMandateModel } from './BuyerMandateTableModel';
import { BuyerMandatesTabModel } from './BuyerMandateTabModel';
import { BuyerUpdateMandateCard } from './BuyerMandateMobileCardModel';
import MobileCard from '../../../Component/MobileCard';

function BuyerMandatesContainer() {
    function renderMobileViewComponent(props) {
        let {listData} = props;
        let buyerMandateObj = BuyerUpdateMandateCard(listData);
        return (
            <div className='list-card-container shadow-md'>
                <MobileCard cardData = {buyerMandateObj}/>
            </div>
        )
    }

    return (
        <div>
            <WrappedWithFilters
                apiUrl={ENDPOINT.MANDATES.getMandateAPi}
                pageTitle="Mandates"
                modifyResponseElement={BuyerUpdateMandateModel}
                tabData={BuyerMandatesTabModel()}
                hasRefreshApi={true}
                hideSortBy={true}
                hasPageFilter={true}
                // defaultSortBy={{
                //     direction: 'DESC',
                //     fieldName: 'updatedAt',
                // }}
                hideTabs={true}
                mobileViewComponent={renderMobileViewComponent}
                rawData={true}
                showCreateMandateCTA = {true}
            />
        </div>
    )
}

export default BuyerMandatesContainer;