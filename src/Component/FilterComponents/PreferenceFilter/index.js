import { Stack } from '@mui/material';
import React, { useCallback } from 'react';
import MultiSelectFilter from '../MultiSelectFilter';
import { deepClone } from '../../../helper/commonHelper';
import SubsectorFilter from '../SubsectorFilter';
import { SubsectorMapping } from '../../../CommonModels/CommonCollection';

function PreferenceFilter({selectedValue=[], sectorOptions, subSectorOptions, handleUpdate, isMobileView=false, ...rest}) {

    const getSectors = useCallback(() => checkSectors(selectedValue), [selectedValue])

    function checkSectors(preferenceArr) {
        let selectedSectorsArr = [];
        selectedSectorsArr = preferenceArr.map((preferenceList) => preferenceList.sector)
        return selectedSectorsArr;
    }

    function handleSectorEdit(value) {
        let newSelectedValue = [...selectedValue], index = -1;
        index = selectedValue?.findIndex(element => element.sector === value.key);
        if(index > -1) {
            newSelectedValue.splice(index, 1);
        }
        else {
            newSelectedValue.push({
                sector: value.key
            });
        }
        handleUpdate(newSelectedValue);
    }

    function getSubsectorOptions() {
        let subSectorArr = {};
        if(getSectors()?.length) {
            getSectors().forEach((sectorList) => {
                if(subSectorOptions[sectorList]) {
                    subSectorArr[sectorList] = SubsectorMapping[sectorList];
                }
            })
        }
        return subSectorArr;
    }

    function handleSubSectorEdit(value, sectorKey) {
        let newSelectedValue = deepClone(selectedValue), index = -1;
        selectedValue.forEach((preferenceList, i) => {
            let subSectorArr = deepClone(preferenceList?.subsectorList || []);
            if(preferenceList.sector === sectorKey) {
                newSelectedValue[i]['subsectorList'] = [];
                index = subSectorArr?.findIndex(element => element === value);
                if(index > -1) {
                    subSectorArr.splice(index, 1);
                }
                else {
                    subSectorArr.push(value);
                }
                newSelectedValue[i]['subsectorList'] = subSectorArr;
            }
        })

        handleUpdate(newSelectedValue);
    }

    return (
        <Stack columnGap={1} rowGap={1} flexDirection={!isMobileView ? 'row' : 'column'}
            {...rest}
        >
            <MultiSelectFilter 
                label={'Sector'} 
                options={sectorOptions} 
                parentClass={'bg-F2F4F7 text-9BA2B3 min-width160'}
                handleSelect={(value) => handleSectorEdit(value)}
                selectedValue={getSectors()} 
                multiSelect={isMobileView}
            />
            <SubsectorFilter 
                label={'Subsector'} 
                options={getSubsectorOptions()}
                parentClass={'bg-F2F4F7 text-9BA2B3 min-width160'}
                handleSelect={(value, sectorKey) => handleSubSectorEdit(value, sectorKey)}
                selectedValue={selectedValue}
                multiSelect={isMobileView}
            />
        </Stack>
    )
}

export default PreferenceFilter;