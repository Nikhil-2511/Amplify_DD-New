import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAdminUser, isAuthenticated, isBuyerUser } from '../../Services';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import './style.scss';
import { Chip } from '@mui/material';
import { isMobileView } from '../../helper/commonHelper';
import DataRoomMobileView from './DataRoomMobileView';
import DataRoomDesktopView from './DataRoomDesktopView';

function DataRoom({}) {
    const navigate = useNavigate();
    const useParamValue = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if(isAuthenticated()) {
            if(isBuyerUser()) navigate('/buyer/browse');
        } 
        else {
            navigate('/login');
        }
        setDataLoaded(true);
    }, [])

    function handleGoBack() {
        let path = `/dashboard${useParamValue?.uid ? `/${useParamValue?.uid}` : ''}`;
        if(isAdminUser()) {
            path = `/admin-user${path}`;
        }
        navigate(path);
    }

    return (
        <div className='data-room-container margin-y20 padding-b20'>
            <div className='container'>
                <div
                    className={"flex col-gap-8 cursor-pointer align-center "}
                    onClick={handleGoBack}
                >
                    <ArrowBackRoundedIcon fontSize="18" />
                    <div className="text-14 font-500">Back to Dashboard</div>
                </div>
                <div className={'margin-t30 margin-b30 ' + (isMobileView() ? 'text-30' : 'text-44 ')}>
                    <span>
                        My Data Room
                    </span>
                    <Chip label={`Beta`} sx={{background: 'rgba(208, 214, 255, 0.15)', fontWeight: 500, color: '#D0D6FF', verticalAlign: 'super', marginLeft: 1.75}} />
                </div>
                {
                    dataLoaded &&
                    <React.Fragment>
                        {
                            isMobileView() ?
                            <DataRoomMobileView />
                            :
                            <DataRoomDesktopView />
                        }
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default DataRoom;