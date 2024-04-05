import React, { useState } from 'react';
import DataRoomSection from '../DataRoomSection';
import { AOA_KEY, AUDIT_KEY, CAPTABLE_KEY, COI_KEY, CREDIT_RATING, GST_FILING_KEY, GST_KEY, ITR_KEY, MOA_KEY, PAN_KEY, PITCHDECK_KEY, TAN_KEY } from '../../../constants/keyVariableConstants';
import { DataRoomModel, Subsections } from '../dataRoomModel';
import { COMPANY_KEY } from '../../../constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './style.scss'

function DataRoomDesktopView() {
    const [selectedSection, setSelectedSection] = useState(COMPANY_KEY);
    const [selectedSubsection, setSelectedSubsection] = useState(PITCHDECK_KEY)
    const [dataLoaded, setDataLoaded] = useState(false);
    const dataModel = DataRoomModel;

    function renderSection() {
        switch(selectedSubsection) {
            default: 
                return documentSection();
        }
    }

    function documentSection() {
        if(Subsections[selectedSection] && Subsections[selectedSection][selectedSubsection]) {
            return (
                <DataRoomSection seletedDataModel={Subsections[selectedSection][selectedSubsection]} />
            )
        }
        return '';
    }

    function handleSelectedSubsection(subsectionListItem) {
        if(selectedSubsection === subsectionListItem.key) return;
        setSelectedSubsection('');
        setTimeout(() => {
            setSelectedSubsection(subsectionListItem.key);
        }, 100)
    }

    function handleSectionClick(selectedValue) {
        if(selectedValue.key !== selectedSection) {
            setSelectedSection(selectedValue.key);
            return;
        }
        setSelectedSection('');
    }

    function getVerticalHeight(listCount) {
        if(listCount > 1) return 11 + (52 * (listCount-1) + (10 * (listCount-1)))
        return 14;
    }

    return (
        <div className='data-room-desktop-view'>
            <div className='flex col-gap-104 relative' >
                <div className='data-room-left-navigation'>
                    <div className='data-rom-left-navigation-content'>
                        {
                            Object.keys(dataModel)?.length > 0 &&
                            Object.keys(dataModel).map((sectionKey, index) => {
                                let sectionListItem = dataModel[sectionKey];
                                return (
                                    <div className='' key={sectionKey}>
                                        <div className={'flex align-center justify-space-between cursor-pointer padding-x16 padding-y14 ' + (selectedSection === sectionListItem?.key ? 'selected-section' : '')} onClick={() => handleSectionClick(sectionListItem)}>
                                            <div className={'flex align-center col-gap-8 '}>
                                                <div className='square-30 bg-3247FF rounded-full text-white text-16 font-600'>{index +1}</div>
                                                <div>{sectionListItem?.label}</div>
                                            </div>
                                            <KeyboardArrowDownIcon className={selectedSection === sectionListItem?.key ? 'rotate_180deg' : ''} sx={{color: '#B5B5B5', fontSize: '22px'}} />
                                        </div>
                                        {
                                            selectedSection === sectionListItem?.key && Object.keys(Subsections[selectedSection])?.length > 0 &&
                                            <div className='flex flex-direction-coloum row-gap-8 sub-section margin-t12 margin-l16 relative'>
                                                <div className='vertical-bar' style={{height: `${getVerticalHeight(Object.keys(Subsections[selectedSection])?.length)}px`}}></div>
                                                {
                                                    Object.keys(Subsections[sectionListItem.key]).map((subsectionKey, index) => {
                                                        let subsectionListItem = Subsections[sectionListItem.key][subsectionKey];
                                                        return (
                                                          <div
                                                            className={
                                                                `relative padding-x16 padding-y14 ${selectedSubsection ===
                                                              subsectionListItem?.key
                                                                ? "selected-section"
                                                                : "text-ffffff66 padding-y14 padding-x16 cursor-pointer"}`
                                                            }
                                                            onClick={() =>
                                                              handleSelectedSubsection(
                                                                subsectionListItem
                                                              )
                                                            }
                                                            key={
                                                              subsectionListItem?.key
                                                            }
                                                          >
                                                            <div className="section-marker"></div>
                                                            {
                                                              subsectionListItem?.label
                                                            }
                                                          </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='data-room-right-navigation'>
                    {renderSection()}
                </div>
            </div>
        </div>
    )
}

export default DataRoomDesktopView;