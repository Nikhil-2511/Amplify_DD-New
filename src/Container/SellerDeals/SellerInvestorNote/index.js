import React, { useState } from 'react';
import { CrossIcon } from '../../../assets/icons';
import './style.scss';
import styled from '@emotion/styled';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#fff',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#282828',
      padding: '10px',
    },
  }));


function ReadMoreComponent({investorNote}) {
    const [showReadMore, setShowReadMore] = useState(false);

    function toggleReadMore() {
        setShowReadMore(!showReadMore);
    }

    return (
        <div className="relative">
            {
                investorNote?.description?.length > 65 ? 
                <React.Fragment>
                    <div>{`${investorNote.description.substring(0, 65)}...`}</div>
                    <BootstrapTooltip
                        title={investorNote?.description}
                        placement="top"
                    >

                        <div className="text-B5B5B5 text-14 cursor-pointer underline-decoration" >Read more</div>
                    </BootstrapTooltip>
                </React.Fragment>
                :
                <div>{investorNote?.description || ''}</div>
            }
            {/* {
                showReadMore &&
                <BootstrapTooltip
                    title={investorNote?.description}
                    placement="top"
                >
                    <div className='absolute padding-12 top-0 w-full bg-282828 rounded-8 z-2'>
                        <CrossIcon sx={{position: 'absolute', right: 10, top: 5, fontSize: 20, cursor: 'pointer', color: '#B5B5B5'}} onClick={() => toggleReadMore()}/>
                        <div className='padding-r20 investore-popup-style text-14'>{investorNote?.description}</div>
                    </div>
                </BootstrapTooltip>
            } */}
        </div>
    )
}

export default ReadMoreComponent;