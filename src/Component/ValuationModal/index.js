import { Box, Modal } from '@mui/material';
import React from 'react';
import { CrossIcon } from '../../assets/icons';
import ValuationReport from '../ValuationReport';

import './style.scss';
import { isMobileView } from '../../helper/commonHelper';

const style = {
  maxWidth: 1164,
  width: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none',
  borderRadius: 4,
  paddingTop: '15px',
  border: '1px solid #353535'
};

const mobileStyle = {
  position: 'absolute',
  margin: '5px',
  height: '100%',
  width: '100%',
  overflow: 'scroll',
  outline: 'none',
  borderRadius: 4,
  paddingTop: '15px',
  border: '1px solid #353535'
};


function ValuationModal({open, handleClose, valuationData, metricData}) {
  return (
    <Modal
      open={open}
      className="valuation-modal"
      onClose={() => handleClose()}
      >
        <Box sx={isMobileView() ? mobileStyle : style} className="primary-theme">
          <div className='valuation-modal-header-content flex justify-space-between align-center'>
            <div className='text-white'>Valuation Report</div>
            <div className='cursor-pointer flex align-center' onClick={() => handleClose()}><CrossIcon sx={{color: '#fff'}} /></div>
          </div>
          <ValuationReport valuationData={valuationData} metricData={metricData} />
        </Box>
    </Modal>
  )
}

export default ValuationModal;