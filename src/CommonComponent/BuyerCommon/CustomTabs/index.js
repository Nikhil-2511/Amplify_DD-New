import React from 'react';
import './style.scss';
import { Divider } from '@mui/material';
import { isMobileView } from '../../../helper/commonHelper';
import { RECOMMENDED_COMPANIES } from '../../../constants';
import VerifiedStatusIcon from '../../../assets/images/verifiedStatusIcon.svg';

function CustomTabs ({tabData, selectedTab, tabClick, className, buyerData={}}) {
    const isMobileDevice = isMobileView();

    function getActiveTab(tabItem) {
        return tabItem?.label === selectedTab?.label;
    }

    function handleOnClick(tabItem) {
        tabClick(tabItem);
    }

    function renderIcon(tabItem) {
        if(getActiveTab(tabItem)) {
            if(tabItem?.activeIcon) return <img src={tabItem.label === RECOMMENDED_COMPANIES ? buyerData?.newRecommendations ? VerifiedStatusIcon : tabItem?.activeIcon : tabItem?.activeIcon} className={ (tabItem.label === RECOMMENDED_COMPANIES && buyerData?.newRecommendations) ? 'custom-icon-size' : ''} alt=""/>
        }
        else {
            if(tabItem?.inActiveIcon) return <img src={tabItem.label === RECOMMENDED_COMPANIES ? buyerData?.newRecommendations ? VerifiedStatusIcon : tabItem?.inActiveIcon : tabItem?.inActiveIcon} className={ (tabItem.label === RECOMMENDED_COMPANIES && buyerData?.newRecommendations) ? 'custom-icon-size' : ''}  alt="" />
        }
    }

    return (
        <div className={'tab-container ' + (className || '')}>
            {
                tabData && tabData.length > 0 &&
                tabData.map((tabItem, index) => {
                    if(isMobileDevice && tabItem?.hideOnMobile) return '';
                    return (
                        <React.Fragment key={'tab-item' + index}>
                            <div className={'tab-item ' + (getActiveTab(tabItem) ? 'active-tab ' : '') + (tabItem.hasDivider ? 'tab-divider' : '')} onClick={() => handleOnClick(tabItem)}>
                                {renderIcon(tabItem)}
                                {
                                    // (!isMobileView() || (isMobileView() && getActiveTab(tabItem))) &&
                                    <span>{tabItem.label}</span>
                                }
                            </div>
                                { tabItem.hasDivider && <Divider orientation="vertical" flexItem />}
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default CustomTabs;