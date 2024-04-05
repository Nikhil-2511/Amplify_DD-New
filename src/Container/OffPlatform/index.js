import React, { useEffect, useState } from 'react';
import OffPlatformSeller from './OffPlatformSeller';
import OffPlatformBuyer from './OffPlatformBuyer';
import { ENDPOINT } from '../../config/endpoint';
import CustomTabs from '../../CommonComponent/BuyerCommon/CustomTabs';
import { handleTitleUpdate } from '../../helper/actionHelper';
import { offPlatformBuyerTableModel, offPlatformBuyerUpdateModel, offPlatformSellerTableModel, offPlatformSellerUpdateModel } from './tableModel';
import OffPlatformBlue from '../../assets/images/offPlatformBlue.svg';
import OffPlatformGrey from '../../assets/images/offPlatformGrey.svg';

function OffPlatform() {

    // const [currentPlatform, setCurrentPlatform] = useState("seller");

    const tabData = [
        {
            activeIcon: OffPlatformBlue,
            inActiveIcon: OffPlatformGrey,
            label: 'Off-Platform Sellers',
            // filterModel: AdminSellerFilterModel(),
            // tableModel: AllSellerTableModel(),
            value: 'seller' ,
            // key: VERIFICATION_STATUS,
            // getRequest: true
        },
        {
            activeIcon: OffPlatformBlue,
            inActiveIcon: OffPlatformGrey,
            label: 'Off-Platform Buyers',
            // filterModel: AdminSellerFilterModel(),
            // tableModel: AllSellerTableModel(),
            value: 'buyer' ,
            // key: VERIFICATION_STATUS,
            // getRequest: true
        }
    ];

    const [selectedTab, setSelectedTab] = useState(tabData[0]);

    useEffect(() => {
        handleTitleUpdate('Off-Platform Sellers');
    }, [])


    function renderTabBasedSection() {
        switch(selectedTab.value) {
            case 'buyer':
                // change the data here
                return <OffPlatformBuyer apiUrl={ENDPOINT.MATCHING.scrappedText} tableModel={offPlatformBuyerTableModel()} updateModel={offPlatformBuyerUpdateModel} />
            default:
                return <OffPlatformSeller apiUrl={ENDPOINT.MATCHING.scrappedText} tableModel={offPlatformSellerTableModel()} updateModel={offPlatformSellerUpdateModel} />
        }
    }

    // function handleTabClick(selectedValue) {
    //     dispatch(updateAppHeaderState(true));
    //     setSelectedTab(selectedValue);
    // }

    function handleTabClick(selectedValue) {
        setSelectedTab(selectedValue);
        selectedValue.value === 'buyer' ? handleTitleUpdate('Off-Platform Buyers') : handleTitleUpdate('Off-Platform Sellers');
        // setCurrentPlatform(selectedValue.value);
    }



    return (
        <div className='seller-notes-container'>
            {/* <h1 className='text-48 font-600'>{`${companyDetails?.name || 'Notes'}`}</h1> */}
            {/* <CustomTabs tabData={SellerNotesTabModel()} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" /> */}
            {
                // Object.keys(companyDetails)?.length > 0 &&
                <React.Fragment>
                    <CustomTabs tabData={tabData} selectedTab={selectedTab} tabClick={handleTabClick} className="margin-y30" />
                    {renderTabBasedSection()}
                </React.Fragment>
            }
        </div>
    )
}

export default OffPlatform;