import React, { useState } from 'react';
import { DataRoomModel, Subsections } from '../dataRoomModel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DocumentsSubsection from '../DocumentsSubsection';
import { COMPANY_KEY } from '../../../constants';

function DataRoomMobileView({}) {
    const [dataModel] = useState(DataRoomModel);
    const [selectedSection, setSelectedSection] = useState(COMPANY_KEY);
    const [selectedSubSection, setSelectedSubSection] = useState('all');

    function renderSelectedSubsection() {
        switch(selectedSection) {
            // case 'company':
            //     return renderCompanySubSection();
            // case 'financial':
            //     return renderFinancialSubSection();
            // case 'revenue': 
            //     return renderRevenueSubsection();
            // case 'tax':
            //     return renderTaxSubsection();
            // case 'legal':
            //     return renderLegalSubsection();
            default: return renderCompanySubSection();
        }
    }

    function renderCompanySubSection() {
        return <DocumentsSubsection selectedSection={selectedSection} selectedSectionModel={DataRoomModel[selectedSection]} selectedSubSection={selectedSubSection} subSectionModelData={Subsections[selectedSection]} />
    }

    function renderFinancialSubSection() {
        return '';
    }

    function renderRevenueSubsection() {
        return '';
    }

    function renderTaxSubsection() {
        return '';
    }

    function renderLegalSubsection() {
        return '';
    }

    function handleState(currentSelectionKey) {
        let currentValue = ''
        if(selectedSection !== currentSelectionKey) currentValue = currentSelectionKey;
        setSelectedSection(currentValue);
    }

    return (
        <div className='data-room-mobile-view flex flex-direction-coloum row-gap-16'>
            {
                Object.keys(dataModel).length > 0 &&
                Object.keys(dataModel).map((dataModelKey, index) => {
                    let currentData = dataModel[dataModelKey];
                    return (
                        <div className='flex flex-direction-coloum row-gap-16' key={`dataModelKey${index}`}>
                            <div className='flex align-center justify-space-between margin' onClick={() => handleState(dataModelKey)}>
                                <div className='flex align-center col-gap-8'>
                                    <div className='icon-box rounded-full text-white text-16 font-500'>{index +1}</div>
                                    <div>{currentData?.label}</div>
                                </div>
                                <KeyboardArrowDownIcon className={selectedSection === dataModelKey ? 'rotate_180deg' : ''} sx={{color: '#B5B5B5', fontSize: '22px'}} />
                            </div>
                            {
                                selectedSection === dataModelKey &&
                                <div>
                                    {renderSelectedSubsection()}
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DataRoomMobileView;