import React from 'react';
import { isMobileView } from '../../../helper/commonHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Chip } from '@mui/material';
import { trackEvent } from '../../../helper/posthogHelper';
import { SELLER_CLICKED_DATA_ROOM } from '../../../constants/posthogEvents';

function DataRoomCard({className, checkProfileCompletion}) {
    const navigate = useNavigate();
    const useParamValue = useParams();

    function handleClick() {
        trackEvent(SELLER_CLICKED_DATA_ROOM);
        if(!checkProfileCompletion()) return;
        let path = `/dataroom${useParamValue?.companyId ? `/${useParamValue?.companyId}` : ''}`
        navigate(path);
    }

    return (
        <div className={"upcoming-feature-section " + (className ? className : "")}>
            {
                <div className="flex justify-space-between padding-x20 padding-b15 border-b border-282828">
                <div className="text-24 flex align-center justify-space-between col-gap-8 w-full">
                    <span>
                        Data Room
                    </span>
                    <Chip label={`Beta`} sx={{background: 'rgba(208, 214, 255, 0.15)', fontWeight: 500, color: '#D0D6FF'}} />
                </div>
                </div>
            }
            <div className={"padding-x20 margin-b10 " + (isMobileView() ? '' : 'padding-t20')}>
                <div className="margin-b25">
                <p className="margin-0 font-300 text-14 padding-y10">
                    Add documents in your data room and share with interested buyers
                </p>
                </div>
                <div className="flex justify-center margin-b10">
                    <div className={'padding-y10 border-white border-radius5 w-full text-center cursor-pointer ' + (isMobileView() ? 'text-12' : 'text14')} onClick={handleClick}>
                        View your dataroom
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataRoomCard;