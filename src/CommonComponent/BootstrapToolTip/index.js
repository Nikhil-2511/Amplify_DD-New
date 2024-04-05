
import React from 'react';
import { Tooltip, styled, tooltipClasses } from '@mui/material';

const TooltipComp = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      padding: '10px',
    },
  }));

export function BootstrapTooltip(props) {
    return <TooltipComp {...props} />
}