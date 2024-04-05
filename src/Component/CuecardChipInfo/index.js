import React from 'react';
import { categoryIconWithColors } from '../../helper/commonHelper';
import { Chip, Stack } from '@mui/material';
import { StoreIcon } from '../../assets/icons/svgIcons';

function CuecardChipInfo({chipData}) {

    function getStylePropeties(type) {
        let category = categoryIconWithColors(type);
        return {background: category.lightColor, color: category.darkColor}
    }

    return (
        <div className='margin-b30'>
            <Stack direction={'row'} columnGap={1}>
                <div>
                    <div className='margin-b5 text-12 text-667085 font-500'>Category</div>
                    <Chip icon={<img src={categoryIconWithColors(chipData?.category).icon} style={{marginBottom: '1px', maxWidth: '11px'}} alt="" />} label={chipData?.category} sx={{...getStylePropeties(chipData?.category), paddingLeft: '10px', paddingRight: '10px'}} />
                </div>
                <div>
                    <div className='margin-b5 text-12 text-667085 font-500'>Seller ID</div>
                    <Chip label={`S${chipData?.id || ''}`} icon={StoreIcon} sx={{paddingLeft: '10px', paddingRight: '10px'}} />
                </div>
            </Stack>
        </div>
    )
}

export default CuecardChipInfo;