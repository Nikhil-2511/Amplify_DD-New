import React from 'react';
import BuyerListing from '../../Component/BuyerComponent/BuyerListing';
import BuyerHeader from '../../Component/BuyerComponent/BuyerHeader';
import SidebarContainer from '../../Component/BuyerComponent/SidebarContainer';

function BuyersContainer() {
    return (
        <div className='buyer-container'>
            <SidebarContainer /> 
            <BuyerHeader />
            <div id="details">
                <BuyerListing />
            </div>
        </div>
    )
}

export default BuyersContainer;