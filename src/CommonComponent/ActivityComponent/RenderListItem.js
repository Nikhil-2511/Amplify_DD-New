import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getDate } from '../../helper/commonHelper';

function RenderListItem({listData, className}) {
    const [showListItem, setShowListItem] = useState(false); 
    return (
        <div className={'' + (className || '')}>
            <div className='flex padding-24 align-center'>
                <div className='width-15'>{listData?.version}</div>
                <div className='width-30'>{listData?.updatedBy}</div>
                <div className='width-30'>{listData?.changeFor}</div>
                <div className='width-15'>{getDate(listData?.updatedAt)}</div>
                <div className='width-10'>
                    {
                        showListItem ?
                        <KeyboardArrowUpIcon sx={{color: '#2E90FA', fontSize: '20px', cursor: 'pointer'}} onClick={() => setShowListItem(false)} />
                        :
                        <KeyboardArrowDownIcon sx={{color: '#2E90FA', fontSize: '20px', cursor: 'pointer'}} onClick={() => setShowListItem(true)} />
                    }
                </div>
            </div>
            {
                showListItem &&
                <div className='changelist-body'>
                    <div className='flex align-center padding-b8 col-gap-8'>
                        <div className='width-20 text-344054 font-600 text-14'>Property Changed</div>
                        <div className='width-40 text-344054 font-600 text-14'>Old Value</div>
                        <div className='width-40 text-344054 font-600 text-14'>New Value</div>
                    </div>
                    <div className="changelist-body-content">
                        {
                            listData?.changeMade?.length > 0 &&
                            listData.changeMade.map((changeList, j) => {
                                return (
                                    <div className='flex align-center col-gap-8 padding-b8' key={changeList.newValue + j}>
                                        <div className='width-20'>{changeList?.property}</div>
                                        <div className='width-40'>{changeList?.oldValue}</div>
                                        <div className='width-40'>{changeList?.newValue}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default RenderListItem;