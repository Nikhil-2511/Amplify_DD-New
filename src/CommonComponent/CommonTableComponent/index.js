import React, { useEffect, useState } from 'react';
import CustomTableGrid from '../../Component/CustomTableGrid';
import { useDispatch } from 'react-redux';
import { updateAppHeaderState } from '../../Redux/slice/AppNavigationSlice';

function CommonTableComponent({tableModel, apiResponse, zeroState={}, modifyResponseElement}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAppHeaderState(true));
        return () => dispatch(updateAppHeaderState(false));
    }, [])

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        if(apiResponse?.length) {
            let prepareModel = [];
            prepareModel = apiResponse.map((elementList) => {
                return  modifyResponseElement(elementList);
            })
            setDataList(prepareModel);
        }
    }, [apiResponse])

    function renderZeroState() {
        return (
            <div className='text-center'>
                <div className="text-30 text-344054 font-600 lh-70">{zeroState?.heading || ''}</div>
                <div className="text-20 text-667085 lh-30">{zeroState?.subHeading || ''}</div>
            </div>
        )
    }

    return <React.Fragment>
        {
            dataList?.length > 0 ?
            <CustomTableGrid tableModel={tableModel} tableData={dataList} />
            :
            renderZeroState()
        }
    </React.Fragment>
}

export default CommonTableComponent;