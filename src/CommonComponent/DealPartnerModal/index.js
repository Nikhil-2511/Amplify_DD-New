import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react'
import CircularTickIcon from '../../assets/images/circularTickIcon.svg' 
import PhoneIcon from '../../assets/images/phoneIcon.svg'
import MailIcon from '../../assets/images/mailIcon.svg'
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const DealPartnerModal = ({title,titleIcon,text1,text2,text1Icon, text2Icon, btnText, closeModal}) => {
  const partnerInfo = useSelector((state => state.authorizationStore?.dealPartnerDetails ));
  return (
    <Modal
      open={true}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, maxWidth: '350px', borderRadius: '8px', border: 'transparent', padding:'24px' }}>
        <div className='flex align-flex-start gap-10'>
            {/* <img src={CircularTickIcon} style={{width: '50px' , position:'relative' , top:'-18px'}}/> */}
            <div>
              <div className='' style={{fontSize: '12px', marginBottom: '20px', fontWeight: '500'}}>{title}, {partnerInfo?.firstName || ''} {partnerInfo?.lastName || ''}</div>
              <div className='flex align-center' style={{marginTop: "10px"}}>
                  <img src={MailIcon} style={{width: '15px' , marginRight: '10px'}}/>
                  <span style={{fontSize: '12px' }}>{partnerInfo?.email || ''}</span>
              </div>
              { partnerInfo?.phone && <div className='flex align-center' style={{marginTop: "10px"}} >
                  <img src={PhoneIcon} style={{width: '15px', marginRight: '10px'}}/>
                  <span style={{fontSize: '12px'}}>{partnerInfo?.phone || ''}</span>
              </div>

              }
              
            </div>
        </div>
         <div className='' onClick={closeModal} style={{background: 'black', color: 'white', textAlign: 'center', padding: '5px', borderRadius: '4px', marginTop: '20px'}}>
          <span>{btnText}</span>
         </div>
      </Box>
    </Modal>
  );
}

export default DealPartnerModal