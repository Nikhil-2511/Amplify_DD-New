import React, { useState } from 'react';
import BuyerHeader from '../../Component/BuyerComponent/AppHeader';
import './style.scss';
import BuyerListing from '../../Component/BuyerComponent/BuyerListing';
import CustomTabs from '../../CommonComponent/BuyerCommon/CustomTabs';
import SidebarContainer from '../../Component/BuyerComponent/SidebarContainer';
import { SellerTabData } from '../../CommonModels/TabModels';

function BuyerComp () {
    const [selectedTab, setSelectedTab] = useState(SellerTabData[0]);

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
    }

    return (
        <div className='buyer-container'>
            <SidebarContainer /> 
            <div className='buyer-body'>
                <BuyerHeader />
                <CustomTabs tabData={SellerTabData} selectedTab={selectedTab} tabClick={handleTabClick} />
                <BuyerListing />
            </div>
        </div>
    )
}

export default BuyerComp;