import React from 'react';
import styled from '@emotion/styled';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepActiveIcon, StepCompletedIcon, StepDefaultIcon } from '../../assets/icons';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 9,
    left: 'calc(-50% + 10px)',
    right: 'calc(50% + 10px)',
    color: '#fff'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#fff',
      color: '#fff'
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#fff',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#fff',
    borderTopWidth: 5,
    color: '#fff',
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: '#fff',
  display: 'flex',
  // height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: 'transparent',
  }),
  '& .stepIcon-completedIcon': {
    zIndex: 1,
  },
  '& .stepIcon-circle': {
    color: "transparent"
  },
  '& .stepIcon-activeIcon': {
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className='stepIcon-completedIcon' ><StepCompletedIcon width="24" height="24" viewBox="0 0 34 34" /></div>) : 
      (active ? (<StepActiveIcon checked={true} className="stepIcon-activeIcon"  width="24" height="24" viewBox="0 0 34 34" />) :
      (<StepDefaultIcon className="stepIcon-circle" width="24" height="24" viewBox="0 0 34 34" />)
      )}
    </QontoStepIconRoot>
  );
}


function CustomStepper({steps, activeStep}) {
  return (
    <Stepper className='text-white' activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
      {steps.map((stepItem) => (
        <Step className='text-white' key={stepItem.label} sx={{color: '#fff'}}>
          <StepLabel className='text-white' sx={{color: '#fff', '&.MuiStepLabel-root':{ '& .MuiStepLabel-label': { color: '#fff', marginTop: '10px'}}}} StepIconComponent={QontoStepIcon}>{stepItem?.label || ''}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default CustomStepper;